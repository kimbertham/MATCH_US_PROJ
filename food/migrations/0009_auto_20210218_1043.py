# Generated by Django 3.1.5 on 2021-02-18 10:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0008_food_completed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='food',
            name='completed',
        ),
        migrations.AlterField(
            model_name='food',
            name='f_id',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
    ]