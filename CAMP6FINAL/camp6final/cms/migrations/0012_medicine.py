# Generated by Django 4.2.9 on 2024-02-13 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0011_rename_appointmentid_diagnosis_appointment'),
    ]

    operations = [
        migrations.CreateModel(
            name='Medicine',
            fields=[
                ('medicine_id', models.IntegerField(primary_key=True, serialize=False)),
                ('medicine_name', models.CharField(max_length=100)),
                ('generic_name', models.CharField(max_length=244)),
                ('company_name', models.CharField(max_length=100)),
                ('expiry_date', models.DateField()),
                ('available_stock', models.IntegerField()),
                ('medicine_price', models.IntegerField()),
            ],
        ),
    ]
