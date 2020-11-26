from django.db import models
from jwt_auth.models import User

class Requests(models.Model):
    
    user_to= models.ForeignKey(
    'jwt_auth.User',
    related_name='r_reciever', 
    on_delete=models.CASCADE)

    user_from = models.ForeignKey(
    'jwt_auth.User',
    related_name='r_sender', 
    on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f' {self.user_from} request to {self.user_to}'


class Connections(models.Model):

    participants = models.ManyToManyField(User, related_name='connections')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f' {self.participants}'
