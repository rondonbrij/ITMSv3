from django.db import models
from django.contrib.auth.models import User, Permission
import random
import string
import os
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.contenttypes.models import ContentType

# Helper function to generate a unique booking code
def generate_booking_code():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))

class TransportCompany(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, default="Unknown Address")
    email = models.EmailField(default="info@default.com")
    contact_number = models.CharField(max_length=15)

    def __str__(self):
        return self.name
    
    

class Destination(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Vehicle(models.Model):
    vehicle_type = models.CharField(max_length=50)
    model_name = models.CharField(max_length=50)
    year = models.PositiveIntegerField()
    plate_number = models.CharField(max_length=20)
    color = models.CharField(max_length=20)
    capacity = models.PositiveIntegerField()
    available = models.BooleanField(default=True)
    qr_code = models.ImageField(upload_to='qr_codes/', null=True, blank=True)
    transport_company = models.ForeignKey(TransportCompany, on_delete=models.CASCADE, related_name='vehicles')

    # Additional Fields
    ltt_number = models.CharField(max_length=50, blank=True, null=True)
    lto_number = models.CharField(max_length=50, blank=True, null=True)
    franchise_number = models.CharField(max_length=50, blank=True, null=True, choices=[('on_process', 'On Process')])
    STATUS_CHOICES = [('parked', 'Parked'), ('maintenance', 'Maintenance'), ('operational', 'Operational')]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='operational')
    violation_count = models.IntegerField(default=0)
    picture = models.ImageField(upload_to='vehicle_pictures/', null=True, blank=True)
    operator = models.CharField(max_length=100, default="Unknown Operator")
    last_driver_operated = models.ForeignKey('Driver', on_delete=models.SET_NULL, related_name='last_operated_vehicles', null=True, blank=True)

    def __str__(self):
        return f"{self.vehicle_type} {self.model_name} ({self.year})"
    
    def clear_qr_code(self):
        if self.qr_code:
            if os.path.isfile(self.qr_code.path):
                os.remove(self.qr_code.path)
            self.qr_code = None
            self.save()

class Feedback(models.Model):
    vehicle = models.ForeignKey(Vehicle, related_name='feedbacks', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    cellphone = models.CharField(max_length=20)
    feedback = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    transport_company = models.ForeignKey(TransportCompany, on_delete=models.CASCADE, related_name='feedbacks', null=True, blank=True, editable=False)

    def __str__(self):
        return f"Feedback from {self.name} on {self.submitted_at}"

    def save(self, *args, **kwargs):
        if not self.transport_company and self.vehicle:
            self.transport_company = self.vehicle.transport_company
        super().save(*args, **kwargs)

class Driver(models.Model):
    name = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50, default="Unknown License")
    transport_company = models.ForeignKey(TransportCompany, on_delete=models.CASCADE, related_name='drivers', null=True, blank=True)
    nfc_code = models.CharField(max_length=255, blank=True, null=True, unique=True) 
    
    # Additional Fields
    STATUS_CHOICES = [('in_terminal', 'In Terminal'), ('departed', 'Departed'), ('arrived', 'Arrived')]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='in_terminal')
    last_nfc_tap_time = models.DateTimeField(null=True, blank=True)  # To track the last NFC tap timestamp
    profile_picture = models.ImageField(upload_to='driver_pictures/', null=True, blank=True)
    citizenship = models.CharField(max_length=100, default="Unknown Citizenship")
    address = models.CharField(max_length=255, default="Unknown Address")
    name_of_vehicle = models.CharField(max_length=100, default="Unknown Vehicle")
    destination = models.CharField(max_length=100, default="Unknown Destination")
    TYPE_CHOICES = [('operator', 'Operator'), ('rounder', 'Rounder')]
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='operator')

    def __str__(self):
        return self.name

    def update_last_nfc_tap_time(self):
        self.last_nfc_tap_time = timezone.now()
        self.save()

class Trip(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='trips')
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='trips')
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, related_name='trips', null=True, blank=True)
    departure_time = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_package = models.BooleanField(default=False)
    delivery_type = models.CharField(max_length=100, default="Passenger")
    transport_company = models.ForeignKey(TransportCompany, on_delete=models.CASCADE, related_name='trips')
    
    # Additional Field
    STATUS_CHOICES = [('scheduled', 'Scheduled'), ('departed', 'Departed'), ('arrived', 'Arrived')]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')

    def __str__(self):
        return f"Trip to {self.destination} by {self.vehicle}"

    def available_seats(self):
        total_passengers = PassengerInfo.objects.filter(booking__trip=self).count()
        return self.vehicle.capacity - total_passengers

class Booking(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    )
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='bookings', db_index=True)
    passenger_name = models.CharField(max_length=100, default="Unknown Passenger")
    passenger_contact = models.CharField(max_length=255, default="Unknown Contact")
    booking_code = models.CharField(max_length=100, unique=True, default=generate_booking_code)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    
    # Additional Fields
    total_passengers = models.IntegerField(default=1)  # Number of passengers for this booking
    total_packages = models.IntegerField(default=0)    # Number of packages for this booking

    def __str__(self):
        return f"Booking {self.booking_code} - {self.passenger_name}"

class PassengerInfo(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='passenger_info', null=True, blank=True)
    name = models.CharField(max_length=100, default="Unknown Name")
    age = models.IntegerField(default=0)
    gender = models.CharField(max_length=20, default="Unknown Gender")

    def __str__(self):
        return self.name

class PackageInfo(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='package_info', null=True, blank=True)
    package_type = models.CharField(max_length=100, default="Unknown Type")
    dimensions = models.CharField(max_length=100, default="Unknown Dimensions")
    weight = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Package - {self.package_type}"

class PaymentProof(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='payment_proofs', null=True, blank=True)
    payment_method = models.CharField(max_length=50, default="Unknown Method")
    proof_image = models.ImageField(upload_to='payment_proofs/')
    submitted_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Payment for {self.booking.booking_code}"

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    seen = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user.username} - Seen: {self.seen}"

class VehicleViolation(models.Model):  # Update class name
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name='violations', null=True, blank=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='vehicle_violations', null=True, blank=True)  # Update related_name
    violation_place = models.CharField(max_length=255)  # Ensure this field is defined
    description = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('unresolved', 'Unresolved'), ('resolved', 'Resolved')], default='unresolved')
    reported_by = models.CharField(max_length=255, null=True, blank=True)  # Change to CharField
    transport_company = models.ForeignKey(TransportCompany, on_delete=models.CASCADE, related_name='vehicle_violations', null=True, blank=True)
    violation_image = models.ImageField(upload_to='violation_slips/', null=True, blank=True)  # Add image field

    def __str__(self):
        return f"Violation: {self.description} - Status: {self.status}"

class Chat(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender.username} to {self.receiver.username} at {self.timestamp}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    transport_company = models.ForeignKey('TransportCompany', on_delete=models.CASCADE, null=True, blank=True)
    backup_email = models.EmailField(blank=True, null=True)
    backup_phone = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
        # Assign all permissions to the new user
        permissions = Permission.objects.all()
        instance.user_permissions.set(permissions)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()

class CancellationRequest(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='cancellations')
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='pending')

class TripCancellationRequest(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="cancellation_requests")
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=(("pending", "Pending"), ("approved", "Approved"), ("denied", "Denied")), default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cancellation Request for {self.trip} - Status: {self.status}"

class Announcement(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_public = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.title} - {'Public' if self.is_public else 'Private'}"

class AuditLog(models.Model):
    ACTION_CHOICES = [
        ('CREATE', 'Create'),
        ('UPDATE', 'Update'),
        ('DELETE', 'Delete'),
    ]
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=10, choices=ACTION_CHOICES)
    model_name = models.CharField(max_length=255)
    object_id = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user} {self.action} {self.model_name} ({self.object_id}) on {self.timestamp}"

class MaintenanceSchedule(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class DTR(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name='dtrs')
    date = models.DateField(auto_now_add=True)  # Automatically set to current date
    time_in = models.DateTimeField(auto_now_add=True)  # Automatically set to current time
    status = models.CharField(
        max_length=20, 
        choices=[('in_terminal', 'In Terminal'), ('departed', 'Departed')],
        default='in_terminal'
    )

    class Meta:
        ordering = ['-date', '-time_in']  # Most recent entries first

    def __str__(self):
        return f"DTR for {self.driver.name} on {self.date}"

class DriverApplication(models.Model):
    applicant = models.CharField(max_length=100)
    citizenship = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    name_of_vehicle = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    type_of_vehicle = models.CharField(max_length=100)
    seating_capacity = models.PositiveIntegerField()
    franchise_number = models.CharField(max_length=50)
    plate_number = models.CharField(max_length=20)
    name_of_driver = models.CharField(max_length=100)
    conductor_name = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending')

    def __str__(self):
        return f"Application by {self.applicant} - Status: {self.status}"

    def approve(self):
        # Create or update the Driver and Vehicle models based on the application details
        transport_company = TransportCompany.objects.first()  # Assuming a single transport company for simplicity

        vehicle, created = Vehicle.objects.get_or_create(
            plate_number=self.plate_number,
            defaults={
                'vehicle_type': self.type_of_vehicle,
                'model_name': self.name_of_vehicle,
                'capacity': self.seating_capacity,
                'franchise_number': self.franchise_number,
                'transport_company': transport_company,
            }
        )

        driver, created = Driver.objects.get_or_create(
            name=self.name_of_driver,
            defaults={
                'license_number': 'Unknown License',
                'transport_company': transport_company,
                'applicant': self.applicant,
                'citizenship': self.citizenship,
                'address': self.address,
                'name_of_vehicle': self.name_of_vehicle,
                'destination': self.destination,
                'type_of_vehicle': self.type_of_vehicle,
                'seating_capacity': self.seating_capacity,
                'franchise_number': self.franchise_number,
                'plate_number': self.plate_number,
                'conductor_name': self.conductor_name,
            }
        )

        self.status = 'approved'
        self.save()
