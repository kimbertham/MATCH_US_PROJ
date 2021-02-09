
from django.shortcuts import render
from rest_framework import serializers
from jwt_auth.serializers import UserSerializer

from .models import Wishlist



class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'

class PopulatedWishlistSerializer(WishlistSerializer):
    user=UserSerializer()