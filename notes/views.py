from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY, HTTP_200_OK,HTTP_204_NO_CONTENT
from rest_framework.exceptions import NotFound,PermissionDenied
from django.db.models import Q
from .models import Notes
from .serializers import NotesSerializer

class NotesListView(APIView):

    def post(self, request):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['sender'] = request.user.id
        m = NotesSerializer(data=request.data)
        if m.is_valid():
            m.save()
            return Response( m.data, HTTP_200_OK)
        return Response(m.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class NotesDetailsView(APIView): 
    def get(self, request, pk, box):
        if box == 'inbox':
            n = Notes.objects.filter(connection=pk).exclude(sender=request.user.id)
        else:
            n = Notes.objects.filter(Q(connection=pk) & Q(sender=request.user.id))
        notes = NotesSerializer(n, many=True)
        return Response(notes.data, HTTP_200_OK)

    def delete(self, request, pk, box):  
        n = Notes.objects.get(id=pk)
        n.delete()
        return Response(status=HTTP_204_NO_CONTENT)

    def patch(self, request, pk, box):
        n = Notes.objects.get(id=pk)
        print(n.sender.id)
        print(request.user.id)
        if request.user.id != n.sender.id:
            n.read = True
            n.save()
            return Response(status=HTTP_200_OK)
        else:
            return Response(status=HTTP_204_NO_CONTENT)

