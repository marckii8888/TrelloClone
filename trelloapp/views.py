from django.shortcuts import render
from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import TodoSerializer      # add this
from .models import Todo
# Create your views here.

# class TodoView(viewsets.ModelViewSet):       # add this
#     serializer_class = TodoSerializer          # add this
#     queryset = Todo.objects.all()              # add this


from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['GET', 'POST'])
def TodoList(request):
    if request.method == 'GET':
        data = Todo.objects.all() 
        serializer = TodoSerializer(data, context={'request': request},many=True)  
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
