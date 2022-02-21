from django.db import models
from jwt_auth.models import User


class Connections(models.Model):

    participants = models.ManyToManyField(User, related_name='connections')
    created_at = models.DateTimeField(auto_now_add=True)
    request = models.IntegerField( blank=True, null=True)

    def __str__(self):
        return f' {self.participants}'
