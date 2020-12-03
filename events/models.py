
from django.db import models

# Create your models here.
class Events(models.Model):
    title = models.CharField(max_length=50)
    time = models.TimeField()
    location =models.CharField(max_length=100, blank=True, null=True)
    request = models.BooleanField(default=True)
    date = models.DateField()
    notes = models.CharField(max_length=50, blank=True, null=True)
    creator =  models.ForeignKey(
        'jwt_auth.User',
        related_name='created_events',
        on_delete=models.CASCADE)

    connection = models.ForeignKey(
        'connections.connections',
        related_name='events',
        on_delete=models.CASCADE)

    TYPE_CHOICES = (
        ('🏓 Sports', '🏓 Sports'),
        ('💃 Music', '💃 Music'),
        ('🍿 Film', '🍿 Film'),
        ('♟️ Indoor', '♟️ Indoor'),
        ('🎡 Outdoor', '🎡 Outdoor'),
        ('🏕️ Travel', '🏕️ Travel'),
        ('🍩 Food','🍩 Food')
    )
    date_type = models.CharField(max_length=100, blank=True, choices=TYPE_CHOICES)
    

