# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from django.db.models import Q
from .serializers import PopulatedFoodSerializer, FoodSerializer
from .models import Food
from .links import nearby, place_id, GImages

class FoodListView(APIView):

    def post(self, request):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['user'] = request.user.id
        f = FoodSerializer(data=request.data)
        if f.is_valid():
            f.save()
            return Response( f.data, HTTP_200_OK)
        return Response(f.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class FoodDetailsView(APIView):
    def post(self, request, pk):
        f_list = Food.objects.filter(Q(user=request.user.id) & Q(connection=pk)).values_list('f_id', flat = True)
        r = requests.get(nearby, params={'location': request.data['location'], 'rankby' : request.data['rankby'], 'keyword': request.data['keyword']}).json()
        e = [d for d in r['results'] if d['place_id'] not in f_list]
        return Response(e, HTTP_200_OK)

    def delete(self, request, pk):
        f = Food.objects.filter(Q(connection=pk) & Q(user=request.user.id))
        f.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class FoodConnectionView(APIView):
    def get(self,request,connection, partner):
        user = Food.objects.filter(Q(user=request.user.id) & Q(connection=connection)).values_list('f_id', flat = True)
        matches = Food.objects.filter(Q(user=partner) & Q(direction=True) & Q(connection=connection) & Q(f_id__in=user)).values_list('f_id', flat = True) [:8]
        results = []
        for id in matches:
            r = requests.get(place_id, params={'place_id': id}).json()['result']
            r['image'] = str(GImages) + str(r['photos'][1]['photo_reference'])
            del r['photos']
            results.append(r)
        return Response (results, HTTP_200_OK)

    def post(self,request, connection, partner):
        food = Food.objects.filter(Q(user=partner) & Q(connection=connection) & Q(f_id=request.data['id'])).exists()
        return Response (food, HTTP_200_OK)

