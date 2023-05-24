from django.contrib.auth.hashers import make_password
from django.db import models
from django.utils import timezone


class Consumer(models.Model):
    name = models.CharField(max_length=150)
    date_of_birth = models.DateField()
    menstruation_length = models.PositiveIntegerField(default=0)
    cycle_length = models.PositiveIntegerField(default=0)
    menstruation_start_date = models.DateField(default=timezone.now)
    email = models.EmailField(primary_key=True)
    google_id = models.CharField(max_length=255, unique=True, default='')

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.google_id = make_password(self.google_id)
        super().save(force_insert=False, force_update=False, using=None, update_fields=None)
