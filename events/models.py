
from django.db import models

# Create your models here.
class Events(models.Model):
    title = models.CharField(max_length=50, blank=True, null=True)
    location =models.CharField(max_length=100, blank=True, null=True)
    participants = models.ManyToManyField('jwt_auth.User')
    date = models.DateField()
    notes = models.CharField(max_length=50, blank=True, null=True)
    connection = models.ForeignKey(
        'connections.connections',
        related_name='events',
        on_delete=models.CASCADE)


