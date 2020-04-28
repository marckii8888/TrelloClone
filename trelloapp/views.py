from django.shortcuts import render
from rest_framework import generics      
from .serializers import TodoSerializer      
from .models import Todo
# Create your views here.

class TodoView(generics.ListCreateAPIView):       
    serializer_class = TodoSerializer          
    queryset = Todo.objects.all()              

class DetailTodo(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
