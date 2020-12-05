
from django.shortcuts import render
from rest_framework import serializers
from jwt_auth.serializers import UserSerializer

from .models import Movies



class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = '__all__'

class PopulatedMovieSerializer(MovieSerializer):
    user=UserSerializer()