from rest_framework import serializers

from .models import User, Task, Goal, Quote


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = (
            "id",
            "content",
            "motivation",
            "completed",
            "time"
        )


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = (
            "id",
            "goal",
            "progress",
            "progressLimit",
        )

class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = (
            "id",
            "author",
            "content",
        )
