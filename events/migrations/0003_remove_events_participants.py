# Generated by Django 3.1.3 on 2020-11-26 21:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_auto_20201122_2316'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='events',
            name='participants',
        ),
    ]