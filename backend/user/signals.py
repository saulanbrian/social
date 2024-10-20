from django.db.models.signals import pre_save
from django.dispatch import receiver 

from django.contrib.auth.hashers import make_password

from .models import CustomUser as User

@receiver(pre_save,sender=User)
def hash_password(sender, instance, **kwargs):
  try:
    user = User.objects.get(pk=instance.pk)
  except User.DoesNotExist:
    instance.set_password(instance.password)