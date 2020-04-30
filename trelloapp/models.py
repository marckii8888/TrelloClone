from django.db import models

# Create your models here.

class TaskList(models.Model):
    title = models.CharField(max_length=120)
    def __str__(self):
        return self.title

class Todo(models.Model):
    tasklist = models.ForeignKey(TaskList, null=True, related_name='tasks', on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title