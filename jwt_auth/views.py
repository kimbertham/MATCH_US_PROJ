
# pylint: disable=no-member, no-self-use
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
import jwt
from django.db.models import Prefetch, prefetch_related_objects, Q
from .serializers import UserSerializer, UserS
from jwt_auth.models import User

from connections.models import Connections
from connections.serializers import EventsSerializer,ConnectionsSerializer, PopulatedEventsSerializer
from activities.models import activities
from notes.models import Notes
from events.models import Events
from food.models import food
from movies.models import movies
from notes.serializers import PopulatedNotesSerializer
from food.serializers import FoodSerializer
from movies.serializers import MovieSerializer
from activities.serializers import ActivitiesSerializer

from connections.serializers import EventsSerializer, PopulatedEventsSerializer
from connections.models import Connections

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration Successful'})
        else :
            return Response(serializer.errors, status=422)

class LoginView(APIView):
    def get_user(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentilais'})

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = self.get_user(username)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid Credentails'})
        dt = datetime.today() + timedelta(days=7)
        token = jwt.encode({'sub': user.id, 'exp': int(
            dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}'})

class ProfileView(APIView):
    def get(self, request, pk):
        s_user = UserSerializer(User.objects.get(pk=pk))
        return Response( s_user.data, status=HTTP_200_OK)

        # get overview 
    def post(self,request,pk):
        prefetch= Prefetch('connection', queryset=Connections.objects.filter(participants__id=pk))
        e = Events.objects.filter(Q(connection__participants__id=pk) & Q(request=False) & Q(date__gte=datetime.today())).prefetch_related(prefetch).order_by('date')[:3]
        r = Events.objects.filter(Q(connection__participants__id=pk)& Q(request=True) & Q(date__gte=datetime.today())).exclude(creator=pk).prefetch_related(prefetch).order_by('date')[:3]
        m = movies.objects.filter(Q(user=pk) & Q(direction=True)).order_by('-created_at')[:2]
        a = activities.objects.filter(Q(user=pk) & Q(direction=True)).order_by('-created_at')[:2]
        f= food.objects.filter(Q(user=pk) & Q(direction=True)).order_by('-created_at')[:2]
        n = Notes.objects.filter(Q(reciever=pk) & Q(read=True)).order_by('-created_at')[:2]
        req = Connections.objects.filter(Q(participants__id=pk) & Q(request=True))
        return Response({
        'events': PopulatedEventsSerializer(e, many=True).data,
        'req': PopulatedEventsSerializer(r, many=True).data,
        'note': PopulatedNotesSerializer(n,many=True).data, 
        'food':FoodSerializer(f, many=True).data , 
        'movie': MovieSerializer(m, many=True).data, 
        'activity': ActivitiesSerializer(a, many=True).data,
        'requests': ConnectionsSerializer(req, many=True).data
        })

    def delete(self, request, pk):
        user = User.objects.get(pk=pk)
        user.delete()
        return Response(status=HTTP_204_NO_CONTENT)

    def patch(self, request, pk):
        user = User.objects.get(pk=pk)
        update_user = UserS(user, data=request.data)
        if update_user.is_valid():
            update_user.save()
            return Response(update_user.data, status=HTTP_200_OK)
        return Response(update_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class ProfilesView(APIView):
    def post(self,request):
        cons = Connections.objects.filter(participants__id=request.user.id).values_list('id',flat=True)
        ids = []
        for id in cons:
            c = Connections.objects.filter(id=id).values_list('participants', flat=True)
            for c in c:
                ids.append(c)
        users = User.objects.filter(first_name__icontains=request.data['query']).exclude(id__in=ids).exclude(id=request.user.id)
        s_users = UserSerializer(users, many=True)
        return Response(s_users.data, status=HTTP_200_OK)
