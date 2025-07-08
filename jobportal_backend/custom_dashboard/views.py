from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from users.models import User
from jobs.models import Job
from applications.models import Application
from company.models import company
from jobs.serializers import JobSerializer
from users.serializers import UserSerializer
from datetime import timedelta
from django.utils import timezone
from .permission import IsPortalAdmin


class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsPortalAdmin]

    def get(self, request):
        return Response({
            "total_users": User.objects.count(),
            "total_jobs": Job.objects.count(),
            "total_applications": Application.objects.count(),
            "total_companies": company.objects.count(),
        })

# List Jobs & Approve/Delete Jobs
class AdminJobListView(APIView):
    permission_classes = [IsAuthenticated, IsPortalAdmin]

    def get(self, request):
        jobs = Job.objects.all().order_by('-created_at')
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)

class ApproveJobView(APIView):
    permission_classes = [IsAuthenticated, IsPortalAdmin]

    def post(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id)
            job.is_approved = True
            job.is_paid = True
            job.save()
            return Response({"message": "Job approved and marked as paid."})
        except Job.DoesNotExist:
            return Response({"error": "Job not found."}, status=404)

class DeleteJobView(APIView):
    permission_classes = [IsAuthenticated, IsPortalAdmin]

    def delete(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id)
            job.delete()
            return Response({"message": "Job deleted."})
        except Job.DoesNotExist:
            return Response({"error": "Job not found."}, status=404)

#cleanup expire job
class DeleteExpiredUnpaidJobsView(APIView):
    permission_classes = [IsAuthenticated, IsPortalAdmin]

    def delete(self, request):
        expired_jobs = Job.objects.filter(is_paid=False, expires_at__lt=timezone.now())
        count = expired_jobs.count()
        expired_jobs.delete()
        return Response({"message": f"{count} expired unpaid jobs deleted."})

#user management
class AdminUserListView(APIView):
    permission_classes = [IsAuthenticated, IsPortalAdmin]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated, IsPortalAdmin]

    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user.delete()
            return Response({"message": "User deleted."})
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=404)
#dummy job posting
class PostDummyJobView(APIView):
    permission_classes = [IsAuthenticated, IsPortalAdmin]

    def post(self, request):
        dummy_user, created = User.objects.get_or_create(
            email='admin-dummy@portal.com',
            defaults={
                'username': 'AdminDummy',
                'role': 'recruiter',
                'is_active': True
            }
        )

        job_data = request.data
        job_data['posted_by'] = dummy_user.id
        job_data['expires_at'] = timezone.now() + timedelta(days=7)

        serializer = JobSerializer(data=job_data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Dummy job posted.", "job": serializer.data})
        return Response(serializer.errors, status=400)
