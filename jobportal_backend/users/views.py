from rest_framework import  status ,generics 
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail

User = get_user_model()
token_generator = PasswordResetTokenGenerator()

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
        

from django.core.mail import send_mail

class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        print("🔍 Requested username:", username)

        try:
            user = User.objects.get(username__iexact=username)
            print("✅ User found:", user)

            email = user.email
            if not email:
                return Response({"error": "No email associated with this user."}, status=400)

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = token_generator.make_token(user)
            reset_url = f"http://localhost:3000/reset-password/{uid}/{token}/"

            print("📧 Sending email to:", email)
            print("🔗 Reset URL:", reset_url)

            subject = "Reset Your Password"
            message = f"Hi {user.username},\n\nClick the link below to reset your password:\n\n{reset_url}\n\nIf you didn't request this, ignore this email."
            send_mail(subject, message, None, [email])

            return Response({"message": "Password reset email sent successfully."}, status=200)

        except User.DoesNotExist:
            print("❌ User not found.")
            return Response({"error": "User not found."}, status=404)

        except Exception as e:
            print("❗ Unexpected error:", str(e))
            return Response({"error": "Something went wrong."}, status=500)
class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        password = request.data.get('password')
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            if not token_generator.check_token(user, token):
                return Response({"error": "Invalid or expired token"}, status=400)

            user.set_password(password)
            user.save()
            return Response({"message": "Password reset successful"}, status=200)

        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            return Response({"error": "Invalid request"}, status=400)
