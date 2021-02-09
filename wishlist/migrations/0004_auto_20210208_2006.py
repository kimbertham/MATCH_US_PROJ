# Generated by Django 3.1.5 on 2021-02-08 20:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('connections', '0003_auto_20201126_2142'),
        ('wishlist', '0003_auto_20210208_2003'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wishlist',
            name='connection',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='wishlist', to='connections.connections'),
        ),
    ]
