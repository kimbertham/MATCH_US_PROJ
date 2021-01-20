# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from django.db.models import Q

from .serializers import PopulatedMovieSerializer, MovieSerializer
from .models import Movies


class MovieListView(APIView):

    def post(self, request):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['user'] = request.user.id
        m = MovieSerializer(data=request.data)
        if m.is_valid():
            m.save()
            return Response( m.data, HTTP_200_OK)
        return Response(m.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request):
        m_list = Movies.objects.filter(user=request.user.id).values_list('f_id', flat = True)
        return Response(m_list, HTTP_200_OK)

class MoviesDetailList(APIView):
    def get(self,request,pk):
        user = Movies.objects.filter(Q(user=request.user.id) & Q(direction = True)).values_list('f_id', flat = True)
        p = Movies.objects.filter(Q(user=pk) & Q(direction=True) & Q(f_id__in=user)).values_list('f_id', flat = True)
        return Response (p, HTTP_200_OK)

    def post(self,request, pk):
        print(request.data)
        movie = Movies.objects.filter(user=pk, f_id=request.data['f_id']).exists()
        return Response( movie, HTTP_200_OK)

    def delete(self, request, pk):
        f = Movies.objects.filter(Q(connection=pk) & Q(user=request.user.id))
        f.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class MovieConnectionView(APIView):
    def get(self,request,connection, partner):
        user = Movies.objects.filter(Q(user=request.user.id) & Q(connection=connection)).values_list('f_id', flat = True)
        matches = Movies.objects.filter(Q(user=partner) & Q(direction=True) & Q(connection=connection) & Q(f_id__in=user)) [:8]
        s_matches = MovieSerializer(matches, many=True)
        return Response (s_matches.data, HTTP_200_OK)

    def post(self,request, connection, partner):
        Movie = Movies.objects.filter(Q(user=partner) & Q(connection=connection) & Q(f_id=request.data['id'])).exists()
        return Response (Movie, HTTP_200_OK)