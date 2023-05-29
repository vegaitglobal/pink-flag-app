from rest_framework import serializers
from core.models.consumer import Consumer

class ConsumerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Consumer
        fields = [
            "name",
            "date_of_birth",
            "menstruation_length",
            "cycle_length",
            "menstruation_start_date",
            "email",
            "google_id",
        ]
        extra_kwargs = {a:{"required": True} for a in fields}
