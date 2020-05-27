from rest_framework import routers
from .views import AssessmentViewSet, QuestionViewSet, AnswerViewSet

router = routers.DefaultRouter()
router.register('assessments', AssessmentViewSet)
router.register('questions', QuestionViewSet)
router.register('answers', AnswerViewSet)

urlpatterns = router.urls
