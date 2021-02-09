from django.db import models

# Create your models here.
class Wishlist(models.Model):
    a_id = models.CharField(max_length=20, unique=True)
    user =  models.ForeignKey(
        'jwt_auth.User',
        related_name='wishlist',
        on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)