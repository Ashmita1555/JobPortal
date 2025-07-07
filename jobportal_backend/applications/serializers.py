from rest_framework import serializers
from .models import Application
from users.models import User
from jobs.models import Job

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
