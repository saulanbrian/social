# Generated by Django 5.1.2 on 2024-12-24 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0007_alter_post_date_time_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='caption',
            field=models.CharField(max_length=1000, null=True),
        ),
    ]
