from rest_framework import routers
from .views import AssessmentViewSet, QuestionViewSet, AnswerViewSet, ResultViewset

router = routers.DefaultRouter()
router.register('assessments', AssessmentViewSet)
router.register('questions', QuestionViewSet)
router.register('answers', AnswerViewSet)
router.register('results', ResultViewset)

urlpatterns = router.urls
