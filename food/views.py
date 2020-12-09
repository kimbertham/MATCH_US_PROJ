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

    # def delete(self, request):
    #     f = Food.objects.filter(user=request.user.id)



class FoodDetailList(APIView):
    def get(self,request,pk):
        user = Food.objects.filter(user=request.user.id).values_list('f_id', flat = True)
        matches = Food.objects.filter(Q(user=pk) & Q(direction=True) & Q(f_id__in=user)).values_list('f_id', flat = True)
        return Response (matches, HTTP_200_OK)