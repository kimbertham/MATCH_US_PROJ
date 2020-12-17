# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from django.db.models import Q
from .serializers import PopulatedFoodSerializer, FoodSerializer
from .models import Food

class FoodListView(APIView):

    def post(self, request):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['user'] = request.user.id
        f = FoodSerializer(data=request.data)
        if f.is_valid():
            f.save()
            return Response( f.data, HTTP_200_OK)
        return Response(f.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request):
        f_list = Food.objects.filter(user=request.user.id).values_list('f_id', flat = True)
        return Response(f_list, HTTP_200_OK)


class FoodDetailList(APIView):
    def get(self,request,connection, partner):
        user = Food.objects.filter(Q(user=request.user.id) & Q(connection=connection)).values_list('f_id', flat = True)
        matches = Food.objects.filter(Q(user=partner) & Q(direction=True) & Q(connection=connection) & Q(f_id__in=user)) [:8]
        s_matches = FoodSerializer(matches, many=True)
        return Response (s_matches.data, HTTP_200_OK)

    def delete(self, request,connection, partner):
        f = Food.objects.filter(Q(connection=connection) & Q(user=request.user.id))
        f.delete()
        return Response(status=HTTP_204_NO_CONTENT)

    def post(self,request, connection, partner):
        food = Food.objects.filter(Q(user=partner) & Q(connection=connection) & Q(f_id=request.data['id'])).exists()
        return Response (food, HTTP_200_OK)