# custom_dashboard/permissions.py

from rest_framework.permissions import BasePermission

class IsPortalAdmin(BasePermission):
    """
    Allows access only to users with role='admin'.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, 'role', None) == 'admin'
