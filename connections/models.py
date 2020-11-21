from django.db import models

from django.db import models

from jwt_auth.models import User

# Create your models here.
class Connections(models.Model):
    participants = models.ManyToManyField(User)

    def __str__(self):
        return f' {self.participants}'
