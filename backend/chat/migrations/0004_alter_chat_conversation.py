# Generated by Django 5.1.2 on 2025-01-15 02:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_chat_conversation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='conversation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='chat.conversation'),
        ),
    ]
