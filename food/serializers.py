
from django.shortcuts import render
from rest_framework import serializers
from jwt_auth.serializers import UserSerializer

from  .models import food

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = food
        fields = '__all__'

class PopulatedFoodSerializer(FoodSerializer):
    user=UserSerializer()