from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from django.db.models import Q
import requests
from lib.links import coOrds, GKey, geoCo, place_id
from events.models import Events


class LocationsView(APIView):
    def post(self, request):
        location = request.data['location']
        r = requests.get(f'{coOrds}{location}', {'key': GKey }).json()['predictions']
        return Response(r, HTTP_200_OK)

class LocationGeoView(APIView):
    def get(self,request,pk):
        addr = Events.objects.filter(connection=pk).values('location','title')
        results = []
        for event in addr:
            location = event['location']
            r = requests.get(f'{geoCo}{location}', {'key': GKey}).json()['results']
            if not len(r) <= 0:
                results.append({ 'title': event['title'], 'address': r[0]['formatted_address'], 'id':r[0]['place_id'], 'lat': r[0]['geometry']['location']['lat'], 'lng': r[0]['geometry']['location']['lng']})
        return Response(results, HTTP_200_OK)
