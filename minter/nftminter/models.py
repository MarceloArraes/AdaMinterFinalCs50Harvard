from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Project(models.Model):
    name = models.CharField(max_length=64)
    datacreation = models.DateTimeField(auto_now_add=True)
    dataexpiration = models.DurationField(blank=False, null=False)
    totalpleadge = models.IntegerField()
    staked = models.DecimalField(default=0.0, max_digits=2, decimal_places=2)

    pass