from django.shortcuts import render  
from .serializers import TodoSerializer      
from .models import Todo

# Create your views here.

from rest_framework import viewsets

class TaskListViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer          
    queryset = Todo.objects.all()  

class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer          
    queryset = Todo.objects.all()  