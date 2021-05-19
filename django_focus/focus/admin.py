from django.contrib import admin

from .models import User, Category, Task, Goal

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Task)
admin.site.register(Goal)
