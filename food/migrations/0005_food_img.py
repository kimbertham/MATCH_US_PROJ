# Generated by Django 3.1.4 on 2020-12-16 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0004_food_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='food',
            name='img',
            field=models.CharField(blank=True, max_length=3000),
        ),
    ]