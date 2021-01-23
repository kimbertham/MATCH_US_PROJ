
from django.shortcuts import render
from rest_framework import serializers
from jwt_auth.serializers import UserSerializer

from .models import movies



class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = movies
        fields = '__all__'

class PopulatedMovieSerializer(MovieSerializer):
    user=UserSerializer()