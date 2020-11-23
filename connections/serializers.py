from django.shortcuts import render
from rest_framework import serializers

from jwt_auth.models import User
from jwt_auth.serializers import UserSerializer
from .models import Connections, Requests
from events.models import Events

class RequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requests
        fields = '__all__'

class ConnectionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connections
        fields = '__all__'

class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'

class BasicConnectionsSeralizer(ConnectionsSerializer):
    participants = UserSerializer(many=True)

class PopulatedConnectionsSerializer(ConnectionsSerializer):
    participants = UserSerializer(many=True)
    events = EventsSerializer(many=True)

class PopulatedRequestsSerializer(RequestsSerializer):
    user_from = UserSerializer()
    user_to = UserSerializer()

class PopulatedEventsSerializer(EventsSerializer):
    participants = UserSerializer(many=True)
    # connection = ConnectionsSerializer()

    

