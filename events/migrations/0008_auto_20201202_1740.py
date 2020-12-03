# Generated by Django 3.1.3 on 2020-12-02 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0007_auto_20201202_1739'),
    ]

    operations = [
        migrations.AlterField(
            model_name='events',
            name='date_type',
            field=models.CharField(blank=True, choices=[('Sports', 'Sports'), ('Music', 'Music'), ('Film', 'Film'), ('Indoor', 'Indoor'), ('🎡', 'Outdoor'), ('Travel', 'Travel'), ('Food', 'Food')], max_length=100),
        ),
    ]