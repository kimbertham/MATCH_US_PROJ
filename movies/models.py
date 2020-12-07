from django.contrib.postgres.fields import ArrayField
from django.db import models

from django.contrib.postgres.fields import ArrayField


# Create your models here.
class Movies(models.Model):
    m_id = models.IntegerField()
    title = models.CharField(max_length=300)
    direction= models.BooleanField()
    # genres= ArrayField(models.CharField(max_length=500), blank=True)
    user =  models.ForeignKey(
        'jwt_auth.User',
        related_name='movies_list',
        on_delete=models.CASCADE)



