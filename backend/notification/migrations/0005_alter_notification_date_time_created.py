# Generated by Django 5.1.2 on 2024-11-30 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notification', '0004_notification_date_time_created_notification_is_read'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='date_time_created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]