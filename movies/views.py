# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from django.db.models import Q
import requests
from .serializers import PopulatedMovieSerializer, MovieSerializer
from .models import movies
from lib.links import tmdb_base, tmdb_key, tmdb_details


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

class MovieDetailsView(APIView):

    def post(self, request, pk ): 
        print(request.data)
        id_list= movies.objects.filter(Q(user=request.user.id) & Q(connection=pk)).values_list('f_id', flat = True)
        r = requests.get(tmdb_base, params=request.data).json()
        e = [d for d in r['results'] if d['id'] not in id_list]
        return Response(e, HTTP_200_OK)

    def get(self, request, pk):
        r = requests.get(f'{tmdb_details}{pk}', params={ 'api_key' : tmdb_key}).json()
        return Response(r, HTTP_200_OK)