from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.contrib import messages
from .models import Contact

# Create your views here.
def home(request):
    if request.method == 'POST':
        try:
            name = request.POST.get('name')
            phone = request.POST.get('phone')
            email = request.POST.get('email')
            message = request.POST.get('message')
            
            # Validate required fields
            if not all([name, phone, email, message]):
                messages.error(request, 'Please fill in all required fields.')
                return render(request, 'index.html')
            
            # Save contact form data
            contact = Contact.objects.create(
                name=name,
                phone=phone,
                email=email,
                message=message
            )
            
            messages.success(request, 'Thank you for contacting us! We will get back to you soon.')
            return redirect('home')
            
        except Exception as e:
            messages.error(request, 'Sorry, there was an error submitting your message. Please try again.')
            return render(request, 'index.html')
    
    return render(request, 'index.html')

def service(request):
    if request.method == 'POST':
        try:
            name = request.POST.get('name')
            phone = request.POST.get('phone')
            email = request.POST.get('email')
            message = request.POST.get('message')
            
            # Validate required fields
            if not all([name, phone, email, message]):
                messages.error(request, 'Please fill in all required fields.')
                return render(request, 'service.html')
            
            # Save contact form data
            contact = Contact.objects.create(
                name=name,
                phone=phone,
                email=email,
                message=message
            )
            
            messages.success(request, 'Thank you for contacting us! We will get back to you soon.')
            return redirect('course')
            
        except Exception as e:
            messages.error(request, 'Sorry, there was an error submitting your message. Please try again.')
            return render(request, 'service.html')
    
    return render(request, 'service.html')

def about(request):
    return HttpResponseRedirect("/#about")  # Redirect to the about section on the homepage

def jobs(request):
    return HttpResponseRedirect("/#jobs")

def training(request):
    return HttpResponseRedirect("/#training")

def consulting(request):
    return HttpResponseRedirect("/#services")

