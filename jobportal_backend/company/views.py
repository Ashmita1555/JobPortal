from django.shortcuts import render
from rest_framework import viewsets
from .models import company
from .serializers import CompanySerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

