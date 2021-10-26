
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("upload", views.upload, name="upload"),
    path("fees", views.fees, name="fees"),
    path("unsig", views.createUnsig, name="createUnsig"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("node", views.node, name="node"),
    path("balanceCheck", views.balanceCheck, name="balanceCheck"),
]
