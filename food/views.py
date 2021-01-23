# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from django.db.models import Q
from django.apps import apps
import requests
from .serializers import PopulatedFoodSerializer, FoodSerializer
from lib.links import nearby, gDetails
from .models import food

class FoodView(APIView):

    def post(self, request):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['user'] = request.user.id
        f = FoodSerializer(data=request.data)
        if f.is_valid():
            f.save()
            return Response( f.data, HTTP_200_OK)
        return Response(f.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class FoodListView(APIView):

    def get(self, request, place_id):
        r = requests.get(gDetails, params={'place_id' : place_id}).json() 
        return Response(r['result'], HTTP_200_OK)

class FoodDetailsView(APIView):

    def post(self, request, pk ): # get results for food  
        id_list= food.objects.filter(Q(user=request.user.id) & Q(connection=pk)).values_list('f_id', flat = True)
        r = requests.get(nearby, params={'location': request.data['location'], 'rankby' : request.data['rankby'], 'keyword': request.data['keyword']}).json()
        e = [d for d in r['results'] if d['place_id'] not in id_list]
        return Response(e, HTTP_200_OK)
