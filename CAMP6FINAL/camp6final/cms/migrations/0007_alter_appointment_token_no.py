# Generated by Django 4.2.9 on 2024-02-11 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0006_appointment_booking_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='token_no',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]
