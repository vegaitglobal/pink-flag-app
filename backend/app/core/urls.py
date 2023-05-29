from django.urls import path

from core.api_views import ConsumerViewSet


urlpatterns = [
    path('consumer/<str:pk>/<str:google_id>', ConsumerViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy',
    })),
    path('consumer', ConsumerViewSet.as_view({
        'post': 'create'
    })),
]
