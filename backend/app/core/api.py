from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.permission import IsAuthenticated


class ConsumerApiView(APIView):

    def post(self, request, *args, **kwargs):

        return Response({}, status=status.HTTP_200_OK)


