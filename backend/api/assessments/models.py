from django.db import models
from django.db.models.fields import CharField
from django.conf import settings


class Assessment(models.Model):
    title = models.CharField(max_length=100)
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.title


class Question(models.Model):
    description = models.TextField(blank=True, null=True)
    question = models.CharField(max_length=200)
    number = models.PositiveSmallIntegerField()
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)

    def __str__(self):
        return self.question


class Answer(models.Model):
    answer = models.CharField(max_length=100)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    is_correct_answer = models.BooleanField(default=False)

    def __str__(self):
        return self.answer


class Result(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.assessment}, {self.score}, {self.date}'
