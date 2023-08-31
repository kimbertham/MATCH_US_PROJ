
# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from django.db.models import Prefetch, prefetch_related_objects, Q
from datetime import datetime, timedelta
import jwt

from .serializers import UserSerializer, UserS
from jwt_auth.models import User
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
