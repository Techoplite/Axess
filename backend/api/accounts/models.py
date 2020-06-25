from django.db import models
from django.contrib.auth.models import User


class Userprofile(models.Model):
    ROLES = [
        ("Student", "Student"),
        ("Teacher", "Teacher"),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=7, choices=ROLES, default="Student")

    def __str__(self):
        return self.user.username
