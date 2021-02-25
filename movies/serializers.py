
from django.shortcuts import render
from rest_framework import serializers
from connections.serializers import ConnectionsSerializer
from .models import movies



class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = movies
        fields = '__all__'

class PopulatedMovieSerializer(MovieSerializer):
    connection=ConnectionsSerializer()