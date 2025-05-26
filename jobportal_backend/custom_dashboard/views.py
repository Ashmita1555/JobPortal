from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from users.models import User
from jobs.models import Job
from applications.models import Application
from company.models import company

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
