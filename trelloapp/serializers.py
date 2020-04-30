from rest_framework import serializers
from .models import Todo, TaskList



class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed',)


class TaskListSerializer(serializers.ModelSerializer):
    tasks = TodoSerializer(many=True)
    
    class Meta:
        model = TaskList
        fields = ('id', 'title', 'tasks')

    def create(self, validated_data):
        tasklist_data = validated_data.pop('tasks')
        tasklist = TaskList.objects.create(**validated_data)
        for tasklist_data in tasklist_data:
            Todo.objects.create(tasklist=tasklist, **tasklist_data)
        return tasklist

    def update(self, instance, validated_data):
        tasks_data = validated_data.pop('tasks')
        instance.title = validated_data.get('title', instance.title)
        instance.save()

        tasks = (instance.tasks).all()
        tasks = list(tasks)

        new_task = tasks_data[len(tasks_data)-1]
        Todo.objects.create(tasklist=instance, **new_task)
        return instance