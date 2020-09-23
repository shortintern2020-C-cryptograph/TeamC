from django.contrib import admin
from django.urls import path, include
from django.conf.urls import include, url
from rest_framework import routers
from .views import AuthRegisterHuman, AuthRegisterAnimal, GetAuthInfo, GetUserInfo, GetAllPost, GetFilteredPost, PostLike
from . import views

urlpatterns = [
    path('post/', views.PostAPI.as_view(), ),
    url(r'^register/human/$', AuthRegisterHuman.as_view()),
    url(r'^register/animal/$', AuthRegisterAnimal.as_view()),
    url(r'user/$', GetAuthInfo.as_view()),
    url(r'user/get/$', GetUserInfo.as_view()),
    url(r'getpost/$', GetAllPost.as_view()),
    url(r'like/$', PostLike.as_view()),
    url(r'getfilteredpost/$', GetFilteredPost.as_view()),
]
