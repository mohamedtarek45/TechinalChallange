from django.contrib import admin
from rest_framework import viewsets 
from .models import Lead
from .serializers import LeadSerializer
# Create your views here.


class viewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer