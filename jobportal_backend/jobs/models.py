from django.db import models
from users.models import User
from company.models import company

class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=100)
    company = models.ForeignKey(company,on_delete=models.CASCADE,related_name='jobs', null=True, blank=True)

    posted_by = models.ForeignKey(User,on_delete=models.CASCADE,related_name='jobs',null=True, blank=True)
    posted_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateField(null=True,blank=True)

    def __str__(self):
        return self.title