from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    name = models.CharField(max_length=100 ,default='User')
    contact = models.CharField(max_length=20 ,blank=True, null=True)
    ROLE_CHOICES=(
        ('admin','Admin'),
        ('recruiter','Recruiter'),
        ('job_seeker','Job Seeker'),
    )
    role=models.CharField(max_length=20,choices=ROLE_CHOICES)
# Create your models here.
