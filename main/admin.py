from django.contrib import admin
from .models import Contact, Client, FollowUp

# Register your models here.

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'email', 'phone']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
    
    def has_add_permission(self, request):
        return False  # Prevent adding contacts through admin
    
    def has_change_permission(self, request, obj=None):
        return False  # Make contacts read-only in admin

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'email', 'phone']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']

@admin.register(FollowUp)
class FollowUpAdmin(admin.ModelAdmin):
    list_display = ['title', 'client', 'scheduled_date', 'priority', 'status']
    list_filter = ['priority', 'status', 'scheduled_date']
    search_fields = ['title', 'client__name', 'client__email']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['scheduled_date']
