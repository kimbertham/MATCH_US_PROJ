
from django.shortcuts import render
from rest_framework import serializers
from jwt_auth.serializers import UserSerializer

from  .models import activities

class ActivitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = activities
        fields = '__all__'

class PopulatedActivitiesSerializer(ActivitiesSerializer):
    user=UserSerializer()