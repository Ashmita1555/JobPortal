from django.urls import path
from .views import *


urlpatterns = [
    path('dashboard/', AdminDashboardView.as_view()),
   
    path('jobs/', AdminJobListView.as_view()),
    path('jobs/approve/<int:job_id>/', ApproveJobView.as_view()),
    path('jobs/delete/<int:job_id>/', DeleteJobView.as_view()),
    path('jobs/expired/delete/', DeleteExpiredUnpaidJobsView.as_view()),
    path('users/', AdminUserListView.as_view()),
    path('users/delete/<int:user_id>/', DeleteUserView.as_view()),
    path('dummy-job/', PostDummyJobView.as_view()),
]
