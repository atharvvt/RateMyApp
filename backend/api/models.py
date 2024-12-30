from django.db import models

class Apps(models.Model):
    app_title = models.CharField(max_length=100)
    app_link = models.TextField()
    app_category = models.CharField(max_length=100)
    app_sub_catagory = models.CharField(max_length=100)
    app_points = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    app_logo = models.ImageField(upload_to="app_logos/", blank=True, null=True)

    def __str__(self):
        return self.app_title


class TaskImage(models.Model):
    app = models.ForeignKey(Apps, on_delete=models.CASCADE, related_name="task_images")
    image = models.ImageField(upload_to="task_images/", blank=True, null=True)

    def __str__(self):
        return f"Task Image for {self.app.app_title}"
