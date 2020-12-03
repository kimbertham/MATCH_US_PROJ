# Generated by Django 3.1.3 on 2020-12-03 00:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0010_auto_20201202_1855'),
    ]

    operations = [
        migrations.AddField(
            model_name='events',
            name='creator',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='created_events', to='jwt_auth.user'),
            preserve_default=False,
        ),
    ]
