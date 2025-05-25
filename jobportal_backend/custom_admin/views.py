from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

class AdminDashboardView(APIView):
    permission_classes = [IsAdminUser]

    def get(self,request):
        from users.models import User
        from jobs.models import Job
        from applications.models import Application
        from company.models import company

        data ={
            "total_users":User.objects.count(),
            "total_jobs":Job.objects.count(),
            "total_applications":Application.objects.count(),
            'total_companies':company.objects.count()
        }

        return Response(data)