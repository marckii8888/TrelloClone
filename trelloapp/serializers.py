from rest_framework import serializers
from .models import Todo


# class TaskListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TaskList
#         fields = ('id', 'title')

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description')