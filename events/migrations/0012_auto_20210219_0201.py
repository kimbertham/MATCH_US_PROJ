# Generated by Django 3.1.5 on 2021-02-19 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0011_events_creator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='events',
            name='title',
            field=models.CharField(max_length=5000),
        ),
    ]
