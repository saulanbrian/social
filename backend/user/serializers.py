from rest_framework import serializers 
from django.contrib.auth.password_validation import validate_password as check_password_validity
from django.contrib.auth.hashers import make_password

from user.models import CustomUser 

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class AuthUserSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = CustomUser
    fields = ('username','password')
    extra_kwargs = {
      'password':{
        'write_only': True
      }
    }
    
  
  #to ensure password is hashed
  def create(self,validated_data):
    user = CustomUser(username=validated_data['username'])
    user.password = make_password(
      validated_data['password']
    )
    user.save()
    return user 
    
  
  def validate_password(self,value):
    check_password_validity(value)
    return value
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
  
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        if user.profile_picture:
            token['profile_picture'] = user.profile_picture.url

        return token
  
    