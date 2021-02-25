# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from django.apps import apps
import requests
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from django.db.models import Q
from lib.links import tmdb_key, tmdb_details, tmdb_poster, place_id, GImages




class MatchListView(APIView):

    def delete(self, request, pk, section): 
        Model = apps.get_model(section, section)
        id_list= Model.objects.filter(Q(user=request.user.id) & Q(connection=pk)).values_list('f_id', flat = True)
        f = Model.objects.filter(Q(connection=pk) & Q(user=request.user.id))
        f.delete()
        return Response(status=HTTP_204_NO_CONTENT)

    def post(self, request, pk, section): 
        Model = apps.get_model(section, section)
        f = Model.objects.filter(Q(connection=pk) & Q(user=request.user.id) & Q(f_id=request.data['id']))
        f.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class MatchConnectionsView(APIView): # gets the Matches  

    def get(self,request, section, connection, partner, amount):
        Model = apps.get_model(section, section)
        user = Model.objects.filter(Q(user=request.user.id) & Q(direction=True) & Q(connection=connection)).values_list('f_id', flat = True)
        if amount == 'all':
            matches = Model.objects.filter(Q(user=partner) & Q(direction=True) & Q(connection=connection) & Q(f_id__in=user)).values_list('f_id', flat = True) 
        else:
            matches = Model.objects.filter(Q(user=partner) & Q(direction=True) & Q(connection=connection) & Q(f_id__in=user)).values_list('f_id', flat = True) [:8]
        results = []
        for id in matches:
            if section == 'movies':
                req = requests.get(f'{tmdb_details}{id}', params={ 'api_key' : tmdb_key}).json()
                r = { 'name' : req['title'], 'image': str(tmdb_poster) + str(req['poster_path']), 'id': req['id']}
                results.append(r)
            else :
                req = requests.get(place_id, params={'place_id': id}).json()['result']
                image = str(GImages) +  str(req['photos'][0]['photo_reference']) if 'photos' in req else None
                r = { 'name' : req['name'], 'image': image , 'id': req['place_id']}
                results.append(r)
        return Response (results, HTTP_200_OK)

    def post(self,request, section, connection, partner, amount):   
        Model = apps.get_model(section, section)
        check = Model.objects.filter(Q(user=partner) & Q(connection=connection) & Q(f_id=request.data['id'])).exists()
        return Response (check, HTTP_200_OK)
