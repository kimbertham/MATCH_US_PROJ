# Generated by Django 3.1.5 on 2021-03-01 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('connections', '0004_auto_20210224_1834'),
    ]

    operations = [
        migrations.AlterField(
            model_name='connections',
            name='request',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
