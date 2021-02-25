from django.shortcuts import render
from rest_framework import serializers

from jwt_auth.models import User
from jwt_auth.serializers import UserSerializer
from .models import Connections
from events.models import Events
from notes.serializers import NotesSerializer


class ConnectionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connections
        fields = '__all__'

class BasicConnectionsSeralizer(ConnectionsSerializer):
    participants = UserSerializer(many=True)

class PopulatedConnectionsSerializer(ConnectionsSerializer):
    participants = UserSerializer(many=True)




class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'

class PopulatedEventsSerializer(EventsSerializer):
    connection = PopulatedConnectionsSerializer()

    

