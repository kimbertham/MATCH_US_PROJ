# Generated by Django 3.1.4 on 2020-12-09 04:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='food',
            name='f_id',
            field=models.CharField(max_length=300),
        ),
    ]
