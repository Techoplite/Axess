from django.shortcuts import render
from rest_framework import viewsets
from .models import Assessment, Question, Answer, Result
from .serializers import AssessmentSerializer, QuestionSerializer, AnswerSerializer, ResultSerializer


class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


class ResultViewset(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
