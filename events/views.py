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

class EventsListView(APIView):

    def post(self,request, pk):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['participants'] = pk, request.user.id
        event = EventsSerializer(data=request.data)
        if event.is_valid():
            event.save()
            return Response(event.data, status=HTTP_201_CREATED)
        return Response(event.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request, pk):
        e=Events.objects.filter(participants=request.user.id)
        events=PopulatedEventsSerializer(e, many=True)
        return Response(events.data, HTTP_200_OK)