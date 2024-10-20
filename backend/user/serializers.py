from rest_framework import serializers  

from django.contrib.auth.password_validation import validate_password

from .models import CustomUser as User

class UserAuthSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = User
    fields = ('username','password')
    extra_kwargs = {
      'password': {
        'write_only':True
      }
    }
    
  def validate_password(self, char):
    validate_password(char)