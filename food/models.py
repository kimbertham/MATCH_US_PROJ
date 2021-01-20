from django.db import models

# Create your models here.
class Food(models.Model):
    f_id = models.CharField(max_length=300)
    name = models.CharField(max_length=300)
    direction= models.BooleanField()
    user =  models.ForeignKey(
        'jwt_auth.User',
        related_name='food_list',
        on_delete=models.CASCADE)
    connection =  models.ForeignKey(
        'connections.ConnectionS',
        related_name='food_list',
        on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ('user', 'f_id', 'connection',)
        ordering = ('-created_at',)

