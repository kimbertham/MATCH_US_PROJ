from django.db import models

# Create your models here.
class Movies(models.Model):
    f_id = models.IntegerField()
    name = models.CharField(max_length=300)
    direction= models.BooleanField()
    user =  models.ForeignKey(
        'jwt_auth.User',
        related_name='movies_list',
        on_delete=models.CASCADE)
    connection =  models.ForeignKey(
        'connections.ConnectionS',
        related_name='movies_list',
        on_delete=models.CASCADE)
        
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ('user', 'f_id', 'connection',)
        ordering = ('-created_at',)