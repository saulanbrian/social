# Generated by Django 5.1.2 on 2025-01-14 06:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='receiver',
        ),
    ]
