from django.shortcuts import render  
from .serializers import TodoSerializer, TaskListSerializer
from .models import Todo, TaskList

# Create your views here.

from rest_framework import viewsets

class TaskListViewSet(viewsets.ModelViewSet):
    serializer_class = TaskListSerializer          
    queryset = TaskList.objects.all()  

class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer          
    queryset = Todo.objects.all()  