from django.urls import path, include
from .import views

urlpatterns = [
   path('',views.home, name='home'),
   path('course/', views.service, name='course'),
   path('training/', views.training, name='training'),
   path('about/', views.about, name='about'),
   path('jobs/', views.jobs, name='jobs'),
   path('services/', views.consulting, name='services'),

]