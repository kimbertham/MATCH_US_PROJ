# pylint: disable=no-member, no-self-use
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK,HTTP_204_NO_CONTENT

from jwt_auth.models import User
from .serializers import BasicConnectionsSeralizer, PopulatedConnectionsSerializer, ConnectionsSerializer
from .models import Connections

class ConnectionsListView(APIView):   

    def get(self, request, pk):
        c= Connections.objects.filter(participants=pk)
        connections = BasicConnectionsSeralizer(c, many=True)
        return Response(connections.data, status=HTTP_200_OK)

    def post(self,request,pk):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['participants'] = pk, request.user.id
        request.data['request'] = request.user.id
        connection = ConnectionsSerializer(data=request.data)
        if connection.is_valid():
            connection.save()
            return Response(connection.data, status=HTTP_201_CREATED)
        return Response(connection.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def patch(self, request,pk):
        connection = Connections.objects.get(pk=pk)
        connection.request = None
        connection.save()
        return Response(status=HTTP_200_OK)

    def delete(self,request ,pk):
        connection = Connections.objects.get(pk=pk)
        connection.delete()
        return Response(status=HTTP_204_NO_CONTENT)
        
class ConnectionsDetailView(APIView):

    def get(self, request, pk):
        con= Connections.objects.get(pk=pk)
        c= PopulatedConnectionsSerializer(con)
        return Response(c.data, status=HTTP_200_OK)
