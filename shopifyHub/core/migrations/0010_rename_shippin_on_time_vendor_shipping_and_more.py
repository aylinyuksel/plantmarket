# Generated by Django 5.0.3 on 2024-04-29 12:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_product_type_product_life_product_mfd_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vendor',
            old_name='shippin_on_time',
            new_name='shipping',
        ),
        migrations.RemoveField(
            model_name='vendor',
            name='authentic_rating',
        ),
    ]