from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from users.models import User
from jobs.models import Job
from applications.models import Application
from company.models import company
from jobs.serializers import JobSerializer
from datetime import timedelta
from django.utils import timezone
from .permission import IsPortalAdmin

class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role == 'admin':
            data = {
                "role": "admin",
                "message": "Welcome Admin!",
                "total_users": User.objects.count(),
                "total_jobs": Job.objects.count(),
                "total_applications": Application.objects.count(),
                "total_companies": company.objects.count()
            }

        elif user.role == 'recruiter':
            data = {
                "role": "recruiter",
                "message": f"Welcome {user.username}",
                "my_jobs": Job.objects.filter(posted_by=user).count(),
                "applications_on_my_jobs": Application.objects.filter(job__posted_by=user).count()
            }

        elif user.role == 'job_seeker':
            data = {
                "role": "job_seeker",
                "message": f"Welcome {user.username}",
                "my_applications": Application.objects.filter(applicant=user).count()
            }

        else:
            data = {
                "role": "unknown",
                "message": "Invalid user role"
            }

        return Response(data)

class AdminJobListView(APIView):
    permission_classes = [IsPortalAdmin]

    def get(self,request):
        user=request.user
        if user.role != 'admin':
            return Response({"detail":"unauthorized"},status=status.HTTP_403_FORBIDDEN)
        jobs = Job.objects.all().order_by('-created_at')
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)
    

class ApproveJobView(APIView):
    permission_classes = [IsPortalAdmin]

    def post(self, request, job_id):
        user = request.user
        if user.role != 'admin':
            return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

        job.is_paid = True
        job.is_approved = True
        job.save()

        return Response({"message": "Job approved and marked as paid."})


class DeleteExpiredUnpaidJobsView(APIView):
    permission_classes = [IsPortalAdmin]

    def delete(self, request):
        if request.user.role != 'admin':
            return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        expired_jobs = Job.objects.filter(is_paid=False, expires_at__lt=timezone.now())
        count = expired_jobs.count()
        expired_jobs.delete()

        return Response({"message": f"{count} expired unpaid jobs deleted."})


class DeleteJobView(APIView):
    permission_classes = [IsPortalAdmin]

    def delete(self, request, job_id):
        if request.user.role != 'admin':
            return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        try:
            job = Job.objects.get(id=job_id)
            job.delete()
            return Response({"message": "Job deleted."})
        except Job.DoesNotExist:
            return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
