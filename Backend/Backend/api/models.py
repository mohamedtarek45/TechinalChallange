from django.db import models

# Create your models here.
class Lead(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    status = models.CharField(max_length=50, choices=[
        ('new', 'New'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed')
    ])
    
    def __str__(self):
        return self.name