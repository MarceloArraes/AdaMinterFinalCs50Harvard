from django.contrib import admin
from .models import Image, Post


# Register your models here.
admin.site.register(Post)
admin.site.register(Image)