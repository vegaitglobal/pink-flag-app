# Generated by Django 4.1.2 on 2023-04-25 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_aboutusmodule_remove_calendarmodule_title_of_module_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='donationpage',
            name='copy_text',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]