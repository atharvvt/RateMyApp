
from django.db import models
from django.contrib.auth.models import User

    
class Apps(models.Model):
    app_title = models.CharField(max_length=100)
    app_link = models.TextField()
    app_category = models.CharField(max_length=100)
    app_sub_catagory = models.CharField(max_length=100)
    app_points = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    app_logo = models.ImageField(default='app_logos/',blank=True, null=True)

    def __str__(self):
        return self.title