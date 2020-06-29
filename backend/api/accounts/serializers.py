from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.contrib.auth.models import User
from django.db import models
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import UserProfile


class RegisterProfileSerializer(RegisterSerializer):
    ROLES = [
        ("Student", "Student"),
        ("Teacher", "Teacher"),
    ]
    role = serializers.ChoiceField(choices=ROLES)

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'role': self.validated_data.get('role', ''),
        }

    def save(self, request):

        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        user_profile = UserProfile.objects.create(
            user_id=user.id, role=self.cleaned_data['role'])
        user_profile.save()
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user


class UserProfileSerializer(UserDetailsSerializer):
    role = serializers.CharField(source="userprofile.role")

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('role',)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})
        role = profile_data.get('role')

        instance = super(UserProfileSerializer, self).update(
            instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data and role:
            profile.role = role
            profile.save()
        return instance
