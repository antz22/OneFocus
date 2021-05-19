from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Task(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="tasks")
    content = models.TextField()
    completed = models.BooleanField()
    motivation = models.TextField(null=True, blank=True)
    time = models.IntegerField(null=True, blank=True)


class Goal(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="goals")
    goal = models.TextField()
    progress = models.IntegerField()
    progressLimit = models.IntegerField()


class Quote(models.Model):
    author = models.TextField()
    content = models.TextField()
