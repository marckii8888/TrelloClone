from django.db import models

# Create your models here.

# class TaskList(models.Model):
#     title = models.CharField(max_length=120)
    
#     def __str__(self):
#         return self.title

class Todo(models.Model):
    title = models.CharField(max_length=120)
    # task_list = models.ForeignKey(TaskList, on_delete=models.CASCADE)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title