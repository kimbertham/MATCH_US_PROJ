# Generated by Django 3.1.4 on 2020-12-06 23:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0005_auto_20201206_2135'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='movies',
            name='genres',
        ),
    ]