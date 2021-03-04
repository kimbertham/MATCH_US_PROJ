
from django.shortcuts import render
from rest_framework import serializers

from connections.serializers import PopulatedConnectionsSerializer

from .models import Notes


class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = '__all__'

class PopulatedNotesSerializer(NotesSerializer):
    connection = PopulatedConnectionsSerializer()