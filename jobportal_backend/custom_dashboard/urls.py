from django.urls import path
from .views import (
    AdminDashboardView,
    AdminJobListView,
    ApproveJobView,
    DeleteExpiredUnpaidJobsView,
    DeleteJobView,
)

urlpatterns = [
    path('dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('dashboard/jobs/', AdminJobListView.as_view(), name='admin-job-list'),
    path('dashboard/job/<int:job_id>/approve/', ApproveJobView.as_view(), name='approve-job'),
    path('dashboard/job/<int:job_id>/delete/', DeleteJobView.as_view(), name='delete-job'),
    path('dashboard/jobs/expired/delete/', DeleteExpiredUnpaidJobsView.as_view(), name='delete-expired-unpaid-jobs'),
]
