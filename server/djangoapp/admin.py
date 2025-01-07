from django.contrib import admin
from .models import CarMake, CarModel


# Register the CarMake model
class CarMakeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')  # Fields to display in the admin list view
    search_fields = ('name',)  # Enable search by name


# Register the CarModel model
class CarModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'car_make', 'type', 'year')  # Fields to display in the admin list view
    list_filter = ('car_make', 'type', 'year')  # Enable filtering by car make, type, and year
    search_fields = ('name', 'car_make__name')  # Enable search by name and car make


# Register your models here.
admin.site.register(CarMake, CarMakeAdmin)
admin.site.register(CarModel, CarModelAdmin)

# CarModelInline class

# CarModelAdmin class

# CarMakeAdmin class with CarModelInline

# Register models here
