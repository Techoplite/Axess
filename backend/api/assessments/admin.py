from django.contrib import admin
from .models import Assessment, Question, Answer
from .models import Result


class ResultAdmin(admin.ModelAdmin):
    list_display = ('date',)


admin.site.register(Assessment)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Result, ResultAdmin)
