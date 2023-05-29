from django.contrib.auth.hashers import check_password
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet
from core.models.consumer import Consumer
from django.http.response import Http404

from core.serializers import ConsumerSerializer


class ConsumerViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet
):
    queryset = Consumer.objects.all()
    serializer_class = ConsumerSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        o = self.queryset.filter(pk=self.kwargs['pk']).first()
        if not o:
            raise Http404
        a = check_password(self.kwargs['google_id'], o.google_id)
        if a:
            return o
        raise Http404
