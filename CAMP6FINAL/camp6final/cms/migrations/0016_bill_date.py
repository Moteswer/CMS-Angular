# Generated by Django 4.2.9 on 2024-02-14 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0015_bill'),
    ]

    operations = [
        migrations.AddField(
            model_name='bill',
            name='date',
            field=models.DateField(auto_now=True),
        ),
    ]
