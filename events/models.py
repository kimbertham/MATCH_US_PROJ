
from django.db import models

# Create your models here.
class Events(models.Model):
    title = models.CharField(max_length=100)
    time = models.TimeField()
    location =models.CharField(max_length=100, blank=True, null=True)
    request = models.BooleanField(default=True)
    date = models.DateField()
    notes = models.CharField(max_length=5000, blank=True, null=True)
    creator =  models.ForeignKey(
        'jwt_auth.User',
        related_name='created_events',
        on_delete=models.CASCADE)

    connection = models.ForeignKey(
        'connections.connections',
        related_name='events',
        on_delete=models.CASCADE)

    TYPE_CHOICES = (
        ('🏓', '🏓'),
        ('💃', '💃'),
        ('🍿', '🍿'),
        ('♟️', '♟️'),
        ('🎡', '🎡'),
        ('🏕', '🏕'),
        ('🍩','🍩')
    )
    date_type = models.CharField(max_length=100, blank=True, choices=TYPE_CHOICES)
    

