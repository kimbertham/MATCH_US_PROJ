# pylint: disable=no-member, no-self-use
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK,HTTP_204_NO_CONTENT
from rest_framework.exceptions import NotFound,PermissionDenied

from jwt_auth.models import User
from connections.serializers import EventsSerializer, PopulatedEventsSerializer
from connections.models import Connections
from .models import Events
from django.db.models import Q


class EventsListView(APIView):
    def get(self, request):
        e=Events.objects.filter(participants=request.user.id)
        events=PopulatedEventsSerializer(e, many=True)
        return Response(events.data, HTTP_200_OK)

class EventsDetailView(APIView):
    def post(self,request, act, pk):
        if not request.POST._mutable:
            request.POST._mutable = True
        if act == 'post':
            request.data['participants'] = pk, request.user.id
            event = EventsSerializer(data=request.data)
            if event.is_valid():
                event.save()
                return Response(event.data, status=HTTP_201_CREATED)
            return Response(event.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        if act == 'get':
            e=Events.objects.filter(Q(participants__in=[request.user.id, pk]) & Q(date__month=request.data['month']))
            events=PopulatedEventsSerializer(e, many=True)
            return Response(events.data, HTTP_200_OK)