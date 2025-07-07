from django.db import models
from users.models import User
from jobs.models import Job
class Application(models.Model):
    job = models.ForeignKey(Job,on_delete=models.CASCADE)
    applicant = models.ForeignKey(User,on_delete = models.CASCADE)
    resume = models.FileField(upload_to='resume/')
    applied_at = models.DateTimeField(auto_now_add=True)

