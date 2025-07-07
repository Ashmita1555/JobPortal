from django.db import models

# Create your models here.
from users.models import User

class company(models.Model):
    name=models.CharField(max_length=255)
    description=models.TextField()
    website = models.URLField(blank=True)
    location = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='company_logos/',blank=True,null=True)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE,related_name='companies')
    created_at= models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name