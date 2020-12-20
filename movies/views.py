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
        m_list = Movies.objects.filter(user=request.user.id).values_list('m_id', flat = True)
        return Response(m_list, HTTP_200_OK)

class MoviesDetailList(APIView):
    def get(self,request,pk):
        user = Movies.objects.filter(user=request.user.id).values_list('m_id', flat = True)
        p = Movies.objects.filter(Q(user=pk) & Q(direction=True) & Q(m_id__in=user)).values_list('m_id', flat = True)
        return Response (p, HTTP_200_OK)

    def post(self,request, pk):
        print(request.data)
        movie = Movies.objects.filter(user=pk, m_id=request.data['m_id']).exists()
        return Response( movie, HTTP_200_OK)