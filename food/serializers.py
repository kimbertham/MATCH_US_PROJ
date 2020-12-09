
from django.shortcuts import render
from rest_framework import serializers
from jwt_auth.serializers import UserSerializer

from .models import Food

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'

class PopulatedFoodSerializer(FoodSerializer):
    user=UserSerializer()