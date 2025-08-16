from django.shortcuts import render
from django.http import HttpResponseRedirect

# Create your views here.
def home(request):
    return render(request, 'index.html')

def service(request):
    return render(request, 'service.html')

def about(request):
    return HttpResponseRedirect("/#about")  # Redirect to the about section on the homepage

def jobs(request):
    return HttpResponseRedirect("/#jobs")

def training(request):
    return HttpResponseRedirect("/#training")

def consulting(request):
    return HttpResponseRedirect("/#services")

