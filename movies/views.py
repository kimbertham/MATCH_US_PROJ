# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from django.db.models import Q
import requests
from .serializers import PopulatedMovieSerializer, MovieSerializer
from .models import movies
from lib.links import tmdb_base, tmdb_key, tmdb_details
import random


class MovieView(APIView):

    def post(self, request):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['user'] = request.user.id
        m = MovieSerializer(data=request.data)
        if m.is_valid():
            m.save()
            return Response( m.data, HTTP_200_OK)
        return Response(m.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class MovieRandomView(APIView):
    def post(self, request):
        if not request.data['random']:
            id_list= movies.objects.filter(Q(user=request.user.id) & Q(direction=True) & Q(connection=request.data['connection'])).values_list('f_id', flat = True)
            matches = movies.objects.filter(Q(user=request.data['partner']) & Q(direction=True) & Q(connection=request.data['connection']) & Q(f_id__in=id_list)).values_list('f_id', flat = True)
            if len(matches) == 0:
                return Response({ 'message': 'No matches, swipe to add more!'})
            choice= matches[random.randint(0, len(matches))]
            r = requests.get(f'{tmdb_details}{choice}' , params={'api_key': tmdb_key}).json()
            return Response(r, HTTP_200_OK)
        else:
            m = requests.get(tmdb_base, params= {'page': {random.randint(0,5) }}).json()
            return Response(m['results'][random.randint(0,18)], HTTP_200_OK )

class MovieDetailsView(APIView):

    def post(self, request, pk ): 
        id_list= movies.objects.filter(Q(user=request.user.id) & Q(connection=pk)).values_list('f_id', flat = True)
        r = requests.get(tmdb_base, params=request.data).json()
        e = [d for d in r['results'] if d['id'] not in id_list]
        return Response(e, HTTP_200_OK)

    def get(self, request, pk):
        r = requests.get(f'{tmdb_details}{pk}', params={ 'api_key' : tmdb_key}).json()
        return Response(r, HTTP_200_OK)