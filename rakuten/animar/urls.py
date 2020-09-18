from django.contrib import admin
from django.urls import path, include
from django.conf.urls import include, url
from rest_framework import routers
from .views import AuthRegisterHuman, AuthRegisterAnimal, GetUserInfo
from . import views

urlpatterns = [
    path('', views.MainAPI.as_view(), ),
    url(r'^register/human/$', AuthRegisterHuman.as_view()),
    url(r'^register/animal/$', AuthRegisterAnimal.as_view()),
    url(r'user/$', GetUserInfo.as_view(), ),
]
