// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            navMenu.classList.toggle('active');

            // Change hamburger icon to close when menu is open
            if (navMenu.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Dropdown functionality for both desktop and mobile
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownToggle && dropdown) {
        // Ensure dropdown starts closed
        dropdown.classList.remove('show');

        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            dropdown.classList.toggle('show');

            // Rotate the chevron icon
            const chevron = this.querySelector('.fa-chevron-down');
            if (chevron) {
                if (dropdown.classList.contains('show')) {
                    chevron.style.transform = 'rotate(180deg)';
                    dropdown.style.display = 'block'; // Show dropdown when opened
                } else {
                    chevron.style.transform = 'rotate(0deg)';
                    dropdown.style.display = 'none'; // Hide dropdown when closed
                }
            }

            // On mobile, don't close the main hamburger menu
            if (window.innerWidth <= 768) {
                return false;
            }
        });

        // Close dropdown when clicking outside (for desktop)
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.dropdown-toggle') && !e.target.closest('.dropdown')) {
                dropdown.classList.remove('show');
                const chevron = dropdownToggle.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                    dropdown.style.display = 'none';
                }
            }
        });
    }

    // Close menu when clicking on a navigation link (but not dropdown toggle)
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function (e) {
            // Don't close main menu if clicking dropdown toggle on mobile
            if (this.classList.contains('dropdown-toggle') && window.innerWidth <= 768) {
                return; // Let the dropdown handler above deal with this
            }

            // Close main menu for other links
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }

            // Close dropdown if clicking dropdown items
            if (this.closest('.dropdown') && dropdown) {
                dropdown.classList.remove('show');
                const chevron = document.querySelector('.dropdown-toggle .fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                    dropdown.style.display = 'none';
                }
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                // Close mobile menu first
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) {
                        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }

                // Then scroll to target
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
    });

    // Form submission handled by Django backend
    // Removed JavaScript form interception to allow Django processing

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('header') && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
            if (dropdown) {
                dropdown.classList.remove('show');
                const chevron = document.querySelector('.dropdown-toggle .fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                    dropdown.style.display = 'none';
                }
            }
        } else {
            // Ensure dropdown is closed when switching to mobile
            if (dropdown) {
                dropdown.classList.remove('show');
                const chevron = document.querySelector('.dropdown-toggle .fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                    dropdown.style.display = 'none';
                }
            }
        }
    });
});