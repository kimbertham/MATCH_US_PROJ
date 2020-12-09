from django.db import models

# Create your models here.
class Movies(models.Model):
    m_id = models.IntegerField()
    title = models.CharField(max_length=300)
    direction= models.BooleanField()
    user =  models.ForeignKey(
        'jwt_auth.User',
        related_name='movies_list',
        on_delete=models.CASCADE)



