# pylint: disable=no-member, no-self-use
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK,HTTP_204_NO_CONTENT
from rest_framework.exceptions import NotFound,PermissionDenied
from django.db.models import Q
import datetime


from jwt_auth.models import User
from .serializers import BasicConnectionsSeralizer, PopulatedConnectionsSerializer, PopulatedRequestsSerializer, ConnectionsSerializer, RequestsSerializer, EventsSerializer
from .models import Connections,Requests

from activities.models import activities
from notes.models import Notes
from events.models import Events
from food.models import food
from movies.models import movies
from notes.serializers import NotesSerializer
from food.serializers import FoodSerializer
from movies.serializers import MovieSerializer
from activities.serializers import ActivitiesSerializer

class RequestsListView(APIView):

    def post(self,request, pk):
        user_to = User.objects.get(pk=pk)
        user_from = User.objects.get(pk=request.user.id)
        request = Requests.objects.get_or_create(user_from=user_from, user_to=user_to)
        return Response(status=HTTP_201_CREATED)

    def get(self, request, pk):
        r= Requests.objects.filter(user_to=pk)
        requests= PopulatedRequestsSerializer(r, many=True)
        return Response(requests.data, status=HTTP_200_OK)
        
class ConnectionsListView(APIView):   

    def get(self, request, pk):
        c= Connections.objects.filter(participants=pk)
        connections = BasicConnectionsSeralizer(c, many=True)
        return Response(connections.data, status=HTTP_200_OK)

    def post(self,request,pk):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['participants'] = pk, request.user.id
        connection = ConnectionsSerializer(data=request.data)
        if connection.is_valid():
            connection.save()
            return Response(connection.data, status=HTTP_201_CREATED)
        return Response(connection.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class ConnectionsDetailView(APIView):

    def get(self, request, pk):
        con= Connections.objects.get(pk=pk)
        c= PopulatedConnectionsSerializer(con)
        return Response(c.data, status=HTTP_200_OK)

# get overview 
    def post(self,request,pk):
        n = Notes.objects.filter(connection=pk).exclude(sender=request.user.id)[:2]
        f = food.objects.filter(Q(connection=pk) & Q(direction=True)).last()
        m = movies.objects.filter(Q(connection=pk) & Q(direction=True)).last()
        a = activities.objects.filter(Q(connection=pk) & Q(direction=True)).last()
        e =Events.objects.filter(Q(connection=pk) & Q(request=False) & Q(time__gt=datetime.datetime.now().time())).reverse()[:3]
        r =Events.objects.filter(Q(connection=pk) & Q(request=True) & Q(time__gt=datetime.datetime.now().time())).reverse()[:3]
        return Response({
        'events': EventsSerializer(e, many=True).data,
        'req': EventsSerializer(r, many=True).data,
        'note': NotesSerializer(n, many=True).data, 
        'food':FoodSerializer(f).data , 
        'movie': MovieSerializer(m).data, 
        'activity': ActivitiesSerializer(a).data})