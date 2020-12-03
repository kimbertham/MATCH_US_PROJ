# Generated by Django 3.1.3 on 2020-12-02 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0008_auto_20201202_1740'),
    ]

    operations = [
        migrations.AlterField(
            model_name='events',
            name='date_type',
            field=models.CharField(blank=True, choices=[('🏓 Sports', '🏓'), ('💃 Music', '💃'), ('🍿 Film', '🍿'), ('♟️ Indoor', '♟️'), ('🎡 Outdoor', '🎡 '), ('🏕️ Travel', '🏕️'), ('🍩 Food', '🍩')], max_length=100),
        ),
    ]
