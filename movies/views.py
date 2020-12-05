# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK

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
        m_list = Movies.objects.filter(user=request.user.id)
        m = MovieSerializer(m_list, many=True)
        return Response(m.data, HTTP_200_OK)