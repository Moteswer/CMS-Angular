# Generated by Django 4.2.9 on 2024-02-13 09:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0010_remove_diagnosis_doctornotes'),
    ]

    operations = [
        migrations.RenameField(
            model_name='diagnosis',
            old_name='appointmentid',
            new_name='appointment',
        ),
    ]
