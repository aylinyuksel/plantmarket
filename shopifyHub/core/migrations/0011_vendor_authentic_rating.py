# Generated by Django 5.0.2 on 2024-04-30 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_rename_shippin_on_time_vendor_shipping_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendor',
            name='authentic_rating',
            field=models.CharField(default='100', max_length=100),
        ),
    ]