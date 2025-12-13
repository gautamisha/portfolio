 // --- 1. Typing Effect ---
        const textElement = document.getElementById("typing-text");
        const roles = ["a Cloud Enthusiast", "a Python Developer", "an ML Engineer"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                textElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        }

        // --- 2. Mobile Menu Toggle ---
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Hamburger Animation
            const lines = hamburger.querySelectorAll('div');
            if(navLinks.classList.contains('active')){
                lines[0].style.transform = "rotate(45deg) translate(5px, 5px)";
                lines[1].style.opacity = "0";
                lines[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
            } else {
                lines[0].style.transform = "none";
                lines[1].style.opacity = "1";
                lines[2].style.transform = "none";
            }
        });

        function closeMenu() {
            navLinks.classList.remove('active');
            const lines = hamburger.querySelectorAll('div');
            lines[0].style.transform = "none";
            lines[1].style.opacity = "1";
            lines[2].style.transform = "none";
        }

        // --- 3. Scroll Reveal Animation ---
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });

        // --- 4. Scroll Progress & Header Styles ---
        const progressBar = document.getElementById('progress-bar');
        const header = document.getElementById('header');
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            // Progress Bar
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";

            // Header Background
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Back to Top Button
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        // --- 5. Mouse Move Effect for Cards (Subtle Glow) ---
        function handleMouseMove(e) {
            const cards = document.querySelectorAll('.project-card');
            for(const card of cards) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }
        }

        // --- 6. Form Submission Simulation ---
        function handleSubmit(e) {
            e.preventDefault();
            const btn = e.target.querySelector('.btn');
            const originalText = btn.innerText;
            
            btn.innerText = "Sending...";
            
            setTimeout(() => {
                btn.innerText = "Message Sent!";
                btn.style.borderColor = "#22c55e";
                btn.style.color = "#22c55e";
                e.target.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.borderColor = "var(--accent-cyan)";
                    btn.style.color = "var(--accent-cyan)";
                }, 3000);
            }, 1500);
        }

        // Start Typing Effect on Load
        document.addEventListener('DOMContentLoaded', type);
