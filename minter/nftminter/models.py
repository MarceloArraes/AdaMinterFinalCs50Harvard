from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    name12 = models.TextField(max_length=64)
    

class Post(models.Model):
    title = models.CharField(max_length=64)
    author = models.CharField(max_length=32)
    ipfsLink = models.TextField(max_length=64)
    description = models.TextField(max_length=64)
    arweaveId = models.TextField(max_length=64)
    nsfw = models.TextField(max_length=25)
    image = models.ImageField(upload_to='post_images')

    def __str__(self):
        return self.title

class Image(models.Model):
    caption=models.CharField(max_length=100)
    image=models.ImageField(upload_to="img/%y")
    def __str__(self):
        return self.caption