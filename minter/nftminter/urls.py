
from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("", views.index, name="index"),
    path("fees", views.fees, name="fees"),
    path("unsig", views.createUnsig, name="createUnsig"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("node", views.node, name="node"),
    path("balanceCheck", views.balanceCheck, name="balanceCheck"),
    path("mintAsset", views.mintAsset, name="mintAsset"),
    path("upload", views.ipfsRegister, name="upload"),
]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
