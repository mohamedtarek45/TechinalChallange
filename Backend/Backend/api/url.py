from django.shortcuts import render
from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
router=DefaultRouter()
router.register('lead',views.viewSet)
urlpatterns = [
    path('VS/',include(router.urls)),
]
