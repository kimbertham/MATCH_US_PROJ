# Generated by Django 3.1.4 on 2020-12-16 18:46

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0003_auto_20201211_0330'),
    ]

    operations = [
        migrations.AddField(
            model_name='food',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
