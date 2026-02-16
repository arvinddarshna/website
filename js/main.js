// ========== MAIN JAVASCRIPT - ALL PAGES ==========

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking a link
    if (navLinks) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // ===== ACTIVE NAVIGATION STATE =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ===== SCROLL ANIMATIONS =====
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });
    
    // ===== ANIMATE STATS ON SCROLL =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const targetText = stat.textContent;
                const target = parseInt(targetText.replace(/[^0-9]/g, ''));
                
                if (!isNaN(target)) {
                    let current = 0;
                    const increment = target / 30;
                    const suffix = targetText.includes('+') ? '+' : '';
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target + suffix;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + suffix;
                        }
                    }, 40);
                }
                
                animateStats.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        animateStats.observe(stat);
    });
    
    // ===== LIQUID ANIMATION ENHANCEMENT =====
    document.addEventListener('mousemove', function(e) {
        const liquid1 = document.querySelector('.liquid-1');
        const liquid2 = document.querySelector('.liquid-2');
        const liquid3 = document.querySelector('.liquid-3');
        
        if (liquid1 && liquid2 && liquid3) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            liquid1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
            liquid2.style.transform = `translate(${x * -40}px, ${y * -40}px)`;
            liquid3.style.transform = `translate(${x * 20}px, ${y * -20}px)`;
        }
    });
    
    // ===== PROFILE IMAGE HOVER =====
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        profileImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // ===== FORM SUBMISSION HANDLER =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value || 'there';
            const purpose = document.getElementById('purpose');
            const purposeText = purpose ? purpose.options[purpose.selectedIndex]?.text : 'inquiry';
            
            alert(`Thank you ${name}! Your ${purposeText.toLowerCase()} has been sent. Dr. Darshna will respond within 3-5 business days.`);
            
            this.reset();
        });
    }
    
    const collaborateForm = document.getElementById('collaborationForm');
    if (collaborateForm) {
        collaborateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value || 'there';
            
            alert(`Thank you ${name}! Your collaboration inquiry has been received. Dr. Darshna will respond within 5-7 business days.`);
            
            this.reset();
        });
    }
    
    // ===== PUBLICATION FILTER =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationCards = document.querySelectorAll('.publication-card');
    
    if (filterButtons.length && publicationCards.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                publicationCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => { card.style.opacity = '1'; }, 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }
    
    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});