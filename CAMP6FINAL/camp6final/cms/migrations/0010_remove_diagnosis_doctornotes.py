# Generated by Django 4.2.9 on 2024-02-13 09:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0009_diagnosis_dosage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='diagnosis',
            name='doctornotes',
        ),
    ]