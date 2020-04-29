from django.contrib import admin
from .models import Todo, TaskList
# Register your models here.

class TaskListAdmin(admin.ModelAdmin):
    list_display = ('title',)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

admin.site.register(Todo, TodoAdmin)
admin.site.register(TaskList, TaskListAdmin)