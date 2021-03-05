# pylint: disable=no-member, no-self-use
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK,HTTP_204_NO_CONTENT
from rest_framework.exceptions import NotFound,PermissionDenied

from django.db.models import Q, Prefetch, prefetch_related_objects

from connections.serializers import EventsSerializer, PopulatedEventsSerializer
from connections.models import Connections
from .models import Events

class EventsView(APIView):
    def post(self,request):
        if not request.POST._mutable:
            request.POST._mutable = True
            request.data['creator'] = request.user.id
            event = EventsSerializer(data=request.data)
            if event.is_valid():
                event.save()
                return Response(event.data, status=HTTP_201_CREATED)
            return Response(event.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class EventsListView(APIView):
    def delete(self, request, pk):
        e=Events.objects.get(pk=pk)
        e.delete()
        return Response(status=HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        e= Events.objects.get(pk=pk)
        event = EventsSerializer(e, data=request.data)
        if event.is_valid():
            event.save()
            return Response(event.data, status=HTTP_200_OK)
        return Response(event.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        

class EventsDetailView(APIView):
    def post(self,request, act, pk):
        if not request.POST._mutable:
            request.POST._mutable = True
            if request.data['section'] != 'home':
                e=Events.objects.filter(Q(connection=request.data['connection']) & Q(date__month=request.data['month']))
            else:
                queryset = Events.objects.filter(connection__participants__id=request.user.id).prefetch_related(Prefetch('connection', queryset=Connections.objects.filter(participants__id=request.user.id)))
                e = queryset.filter(date__month=request.data['month'])
            events=PopulatedEventsSerializer(e, many=True)
            return Response(events.data, HTTP_200_OK)


