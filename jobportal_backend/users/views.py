from rest_framework import  status ,generics 
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

User = get_user_model()

# ✅ Register new users
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Register serializer errors:", serializer.errors)  # <-- add this
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# ✅ Get/update the authenticated user
class UserDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

# ✅ Role-based dashboard info (custom endpoint)
class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == 'admin':
            return Response({"dashboard": "Admin Dashboard", "features": ["Manage users", "All jobs", "All applications"]})
        elif user.role == 'recruiter':
            return Response({"dashboard": "Recruiter Dashboard", "features": ["Post jobs", "Manage applicants"]})
        elif user.role == 'job_seeker':
            return Response({"dashboard": "Job Seeker Dashboard", "features": ["Search jobs", "Apply to jobs"]})
        else:
            return Response({"error": "Invalid role"}, status=400)
