# Generated by Django 5.1.2 on 2024-11-30 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0005_post_likes'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='date_time_created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
