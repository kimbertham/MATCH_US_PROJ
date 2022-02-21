# pylint: disable=no-member, no-self-use
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from django.db.models import Prefetch, prefetch_related_objects, Q

from connections.models import Connections
from connections.serializers import EventsSerializer,PopulatedConnectionsSerializer, PopulatedEventsSerializer
from activities.models import activities
from notes.models import Notes
from events.models import Events
from food.models import food
from movies.models import movies
from notes.serializers import PopulatedNotesSerializer
from food.serializers import FoodSerializer
from movies.serializers import MovieSerializer
from activities.serializers import ActivitiesSerializer

class Overview(APIView):

    def post(self,request,pk, sec):
        if sec == 'con':
            n = Notes.objects.filter(Q(reciever=request.user.id) & Q(connection=pk) & Q(read=True))[:2]
            f = food.objects.filter(Q(connection=pk) & Q(direction=True)).last()
            m = movies.objects.filter(Q(connection=pk) & Q(direction=True)).last()
            a = activities.objects.filter(Q(connection=pk) & Q(direction=True)).last()
            e = Events.objects.filter(Q(connection=pk) & Q(request=False)& Q(date__gte=datetime.today())).order_by('date')[:5]
            r = Events.objects.filter(Q(connection=pk) & Q(request=True) & Q(date__gte=datetime.today())).exclude(creator=request.user.id).order_by('date')[:5]
            return Response({
            'events': PopulatedEventsSerializer(e, many=True).data,
            'req': PopulatedEventsSerializer(r, many=True).data,
            'note': PopulatedNotesSerializer(n, many=True).data, 
            'food':FoodSerializer(f).data , 
            'movie': MovieSerializer(m).data, 
            'activity': ActivitiesSerializer(a).data})
        else :
            prefetch= Prefetch('connection', queryset=Connections.objects.filter(participants__id=pk))
            e = Events.objects.filter(Q(connection__participants__id=pk) & Q(request=False) & Q(date__gte=datetime.today())).prefetch_related(prefetch).order_by('date')[:5]
            r = Events.objects.filter(Q(connection__participants__id=pk)& Q(request=True) & Q(date__gte=datetime.today())).exclude(creator=pk).prefetch_related(prefetch).order_by('date')[:5]
            m = movies.objects.filter(Q(user=pk) & Q(direction=True)).order_by('-created_at')[:2]
            a = activities.objects.filter(Q(user=pk) & Q(direction=True)).order_by('-created_at')[:2]
            f= food.objects.filter(Q(user=pk) & Q(direction=True)).order_by('-created_at')[:2]
            n = Notes.objects.filter(Q(reciever=pk) & Q(read=True)).order_by('-created_at')[:2]
            return Response({
            'events': PopulatedEventsSerializer(e, many=True).data,
            'req': PopulatedEventsSerializer(r, many=True).data,
            'note': PopulatedNotesSerializer(n,many=True).data, 
            'food':FoodSerializer(f, many=True).data , 
            'movie': MovieSerializer(m, many=True).data, 
            'activity': ActivitiesSerializer(a, many=True).data,
            })
