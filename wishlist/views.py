from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_422_UNPROCESSABLE_ENTITY,HTTP_204_NO_CONTENT,HTTP_200_OK
from django.db.models import Q
import requests
from .serializers import WishlistSerializer
from .models import Wishlist
from lib.links import amazonURL, amazon_headers, amazon_details


class WishlistView(APIView):

    def post(self, request):
        if not request.POST._mutable:
            request.POST._mutable = True
        request.data['user'] = request.user.id
        m = WishlistSerializer(data=request.data)
        if m.is_valid():
            m.save()
            return Response( m.data, HTTP_200_OK)
        return Response(m.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        
class WishlistDetailsView(APIView):

    def post(self,request,pk):
        r = requests.request("GET", amazonURL, headers=amazon_headers, params={'domainCode':'co.uk','keyword':request.data['keyword'],'page':'1','sortBy':'relevanceblender'}).json()['searchProductDetails']
        return Response(r, HTTP_200_OK)

    def get(self, request, pk):
        r = Wishlist.objects.filter(user=pk).values_list('a_id', flat=True )
        results = []
        if len(r) == 0 :
            results = {'message': 'No Wishlist Items'}
        for id in r:
            req = requests.get(amazon_details, headers=amazon_headers, params={'url': f'https://www.amazon.co.uk/dp/{id}'}).json()
            data={'productDescription':req['productTitle'], 'imgUrl': req['imageUrlList'][0] , 'price': req['price'], 'productRating' :req['productRating'], 'asin': id }
            results.append(data)
        return Response(results, HTTP_200_OK)

    


