# pylint: disable=no-member, no-self-use
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK,HTTP_204_NO_CONTENT
from rest_framework.exceptions import NotFound,PermissionDenied
from django.db.models import Q
import datetime

from jwt_auth.models import User
from .serializers import BasicConnectionsSeralizer, PopulatedConnectionsSerializer, ConnectionsSerializer,PopulatedEventsSerializer
from .models import Connections

from activities.models import activities
from notes.models import Notes
from events.models import Events
from food.models import food
from movies.models import movies
from notes.serializers import NotesSerializer
from food.serializers import FoodSerializer
from movies.serializers import MovieSerializer
from activities.serializers import ActivitiesSerializer

        
class ConnectionsListView(APIView):   

    def get(self, request, pk):
        c= Connections.objects.filter(participants=pk)
        connections = BasicConnectionsSeralizer(c, many=True)
        return Response(connections.data, status=HTTP_200_OK)

    def post(self,request,pk):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['participants'] = pk, request.user.id
        request.data['request'] = request.user.id
        connection = ConnectionsSerializer(data=request.data)
        if connection.is_valid():
            connection.save()
            return Response(connection.data, status=HTTP_201_CREATED)
        return Response(connection.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def patch(self, request,pk):
        connection = Connections.objects.get(pk=pk)
        connection.request = None
        connection.save()
        return Response(status=HTTP_200_OK)

    def delete(self,request ,pk):
        connection = Connections.objects.get(pk=pk)
        f.delete()
        return Response(state=HTTP_204_NO_CONTENT)
        
class ConnectionsDetailView(APIView):

    def get(self, request, pk):
        con= Connections.objects.get(pk=pk)
        c= PopulatedConnectionsSerializer(con)
        return Response(c.data, status=HTTP_200_OK)

# get overview 
    def post(self,request,pk):
        n = Notes.objects.filter(Q(reciever=request.user.id) & Q(read=True))[:2]
        f = food.objects.filter(Q(connection=pk) & Q(direction=True)).last()
        m = movies.objects.filter(Q(connection=pk) & Q(direction=True)).last()
        a = activities.objects.filter(Q(connection=pk) & Q(direction=True)).last()
        e =Events.objects.filter(Q(connection=pk) & Q(request=False)& Q(date__gte=datetime.datetime.today())).order_by('date')[:3]
        r =Events.objects.filter(Q(connection=pk) & Q(request=True) & Q(date__gte=datetime.datetime.today())).exclude(creator=request.user.id).order_by('date')[:3]
        return Response({
        'events': PopulatedEventsSerializer(e, many=True).data,
        'req': PopulatedEventsSerializer(r, many=True).data,
        'note': NotesSerializer(n, many=True).data, 
        'food':FoodSerializer(f).data , 
        'movie': MovieSerializer(m).data, 
        'activity': ActivitiesSerializer(a).data})
