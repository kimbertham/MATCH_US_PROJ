# Generated by Django 3.1.4 on 2020-12-05 02:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0003_auto_20201205_0226'),
    ]

    operations = [
        migrations.AddField(
            model_name='movies',
            name='m_id',
            field=models.IntegerField(default=1, unique=True),
            preserve_default=False,
        ),
    ]
