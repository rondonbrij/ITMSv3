from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from two_factor.views import (
    LoginView, SetupView, QRGeneratorView, BackupTokensView, ProfileView, DisableView
)
from django.views.generic import TemplateView
from .views import submit_feedback, view_feedback, submit_violation, booking_detail_view  # Ensure the view is imported

# Create a router to auto-generate routes for Vehicle, Driver, and Trip
router = DefaultRouter()
router.register(r'vehicles', views.VehicleViewSet, basename='vehicle')
router.register(r'drivers', views.DriverViewSet, basename='driver')
router.register(r'trips', views.TripViewSet, basename='trip')
router.register(r'bookings', views.BookingViewSet, basename='booking')
router.register(r'user-profiles', views.UserProfileViewSet, basename='userprofile')
router.register(r'driver-applications', views.DriverApplicationViewSet, basename='driverapplication')

# Define all other URL patterns here
urlpatterns = [
    # Passenger-facing routes
    path('destinations/', views.DestinationListView.as_view(), name='destination_list'),
    path('available-trips/', views.AvailableTripsView.as_view(), name='available_trips'),
    path('trip-detail/<int:pk>/', views.TripDetailView.as_view(), name='trip_detail'),
    path('submit-payment/', views.PaymentProofView.as_view(), name='submit_payment'),
    path('booking-status/', views.BookingStatusView.as_view(), name='booking_status'),
    path('cancellation-request/', views.CancellationRequestView.as_view(), name='cancellation_request'),
    path('contact-support/', views.ContactSupportView.as_view(), name='contact_support'),
    path('submit-feedback/<int:vehicle_id>/', submit_feedback, name='submit_feedback'),
    path('vehicles/<int:vehicle_id>/feedback/', submit_feedback, name='submit_feedback'),
    path('feedback/<int:feedback_id>/', view_feedback, name='view_feedback'),

    # Booking creation and detail view
    path('bookings/create/', views.BookingCreateView.as_view(), name='booking_create'),
    path('bookings/<str:booking_code>/', views.BookingDetailView.as_view(), name='booking_detail'),
    path('booking-detail/', booking_detail_view, name='booking_detail'),

    # Authentication routes
    path('login/', views.login_view, name='login'),
    path('check-auth/', views.check_auth, name='check_auth'),
    path('logout/', views.logout_view, name='logout'),

    # Notification routes
    path('notifications/', views.get_notifications, name='get_notifications'),
    path('notifications/mark-seen/', views.mark_notifications_seen, name='mark_notifications_seen'),

    # Payment verification for transport companies
    path('verify-payment/<int:booking_id>/', views.verify_payment, name='verify_payment'),

    # Dashboard routes
    path('dashboard/', views.transport_company_dashboard, name='dashboard'),
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),

    # Transport Dashboard
    path('dashboard-statistics/', views.dashboard_statistics_transpo, name='dashboard_statistics'),
    path('api/dashboard/stats/', views.dashboard_statistics, name='dashboard_statistics'),
    path('api/bookings/recent/', views.recent_bookings, name='recent_bookings'),

    # LTT Admin
    path('manage-companies/', views.TransportCompanyManagementView.as_view(), name='manage_companies'),
    path('analytics/', views.AnalyticsView.as_view(), name='analytics'),
    path('advanced-analytics/', views.AdvancedAnalyticsView.as_view(), name='advanced_analytics'),
    path('reports/', views.ReportsView.as_view(), name='reports'),
    path('admin-dashboard/', views.AdminDashboardView.as_view(), name='admin_dashboard'),
    path('notifications/send/', views.NotificationView.as_view(), name='send_notification'),
    path('announcements/', views.AnnouncementView.as_view(), name='post_announcement'),
    path('audit-logs/', views.AuditLogListView.as_view(), name='audit_logs'),
    path('report-summary/', views.ReportSummaryView.as_view(), name='report_summary'),
    path('export-report/', views.ExportReportView.as_view(), name='export_report'),
    path('export-report/status/<task_id>/', views.ExportStatusView.as_view(), name='export_status'),

    # Two-factor authentication specific paths
    path('account/login/', LoginView.as_view(), name='login'),
    path('account/logout/', views.logout_view, name='logout'),
    path('account/two_factor/setup/', SetupView.as_view(), name='setup'),
    path('account/two_factor/qrcode/', QRGeneratorView.as_view(), name='qr'),
    path('account/two_factor/setup/complete/', ProfileView.as_view(), name='setup_complete'),
    path('account/two_factor/backup/tokens/', BackupTokensView.as_view(), name='backup_tokens'),
    path('account/two_factor/', ProfileView.as_view(), name='profile'),
    path('account/two_factor/disable/', DisableView.as_view(), name='disable'),

    # WebSocket Consumers
    path('ws/notifications/', views.NotificationConsumer.as_asgi()),
    path('ws/chat/', views.ChatConsumer.as_asgi()),

    # CSRF Token
    path('csrf/', views.get_csrf_token, name='csrf_token'),
    path('driver-info/<str:nfc_code>/', views.get_driver_info, name='get_driver_info'),
    path('nfc/', TemplateView.as_view(template_name='NFC.html'), name='nfc'),
    path('nfc-tap/<int:driver_id>/', views.nfc_tap_view, name='nfc_tap'),

    # Vehicle details API
    path('api/vehicle-details/<int:vehicle_id>/', views.vehicle_details_view, name='vehicle_details'),

    # QR Scan view
    path('api/qr-scan/<int:vehicle_id>/', TemplateView.as_view(template_name='QR-scan.html'), name='qr_scan'),

    # Violation submission route
    path('api/submit-violation/', submit_violation, name='submit_violation'),
] + router.urls
