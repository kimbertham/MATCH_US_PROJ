# Generated by Django 3.1.3 on 2020-12-02 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0005_auto_20201126_2201'),
    ]

    operations = [
        migrations.AddField(
            model_name='events',
            name='date_type',
            field=models.CharField(blank=True, choices=[('Sports', 'Sports'), ('Music', 'Music'), ('Film', 'Film'), ('Indoor', 'Indoor'), ('Outdoor', 'Outdoor'), ('Travel', 'Travel'), ('Food', 'Food')], max_length=100),
        ),
        migrations.AlterField(
            model_name='events',
            name='title',
            field=models.CharField(default=1, max_length=50),
            preserve_default=False,
        ),
    ]
