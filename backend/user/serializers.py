from rest_framework import serializers 
from django.contrib.auth.password_validation import validate_password as check_password_validity
from django.contrib.auth.hashers import make_password

from user.models import CustomUser 

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
  
  is_followed = serializers.SerializerMethodField()
  
  class Meta:
    model = CustomUser
    fields = (
      'id',
      'username',
      'profile_picture',
      'background_photo',
      'bio',
      'followers',
      'following',
      'is_followed'
    )
   
    
  def get_is_followed(self,obj):
    request = self.context.get('request',None)
    if request and request.user.is_authenticated:
      if obj.followers and obj.followers.count() >= 1:
        return obj.followers.filter(id=request.user.id).exists() 
    return None 
  
  def to_representation(self,obj):
    representation = super().to_representation(obj)
    request = self.context.get('request')
    if not request or not request.user.is_authenticated:
      try:
        representation.pop('is_followed')
      except:
        pass
    return representation

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

        token['id'] = str(user.id)
        token['username'] = user.username
        if user.profile_picture:
            token['profile_picture'] = user.profile_picture.url

        return token
  

    