from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True, blank=True)
    profile_image = models.CharField(max_length=500, default='https://bit.ly/30vhZFs', blank=True)

    
