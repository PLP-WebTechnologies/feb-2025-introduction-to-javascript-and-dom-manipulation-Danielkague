// Wait for the DOM to be fully loaded before executing script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize active navigation
    setActiveNavLink();
    
    // Setup event listeners
    setupNavigation();
    setupContactForm();
    setupProjectCards();
    animateSkillsItems();
    
    // Setup dynamic text content change
    setupDynamicTextChange();
    
    // Setup dynamic CSS style modification
    setupDynamicStyleModification();
    
    // Setup add/remove element functionality
    setupAddRemoveElement();
    
    // Add smooth scrolling effect for all sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                setActiveNavLink(targetId);
            }
        });
    });
});

// Set active navigation link based on current scroll position
function setActiveNavLink(targetId = null) {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (targetId) {
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to the clicked link
        document.querySelector(`a[href="${targetId}"]`).classList.add('active');
    } else {
        // Determine which section is currently in view
        let currentSection = '';
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = '#' + section.getAttribute('id');
                    
                    // Remove active class from all links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to the current section's link
                    const activeLink = document.querySelector(`a[href="${currentSection}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        });
    }
}

// Setup navigation with active state styles
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add active class style to the CSS if not already present
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            background-color: var(--main-color);
            border-radius: 50%;
            transform: translateY(-0.25rem);
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Set home as default active
    document.querySelector('a[href="#home"]').classList.add('active');
}

// Setup contact form with validation and submission handling
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const fullName = this.querySelector('input[name="fullname"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            // Basic validation
            if (!fullName || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (in a real scenario, you would send data to a server)
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Create notification system
function showNotification(message, type = 'success') {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
        
        // Add styles for the notification
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 5rem;
                right: 1.5rem;
                padding: 1rem 2rem;
                border-radius: 1rem;
                color: var(--light-color);
                font-weight: var(--semi-bold-font);
                z-index: var(--z-fixed);
                opacity: 0;
                transform: translateY(1rem);
                transition: all 0.3s ease;
            }
            
            .notification.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .notification.success {
                background-color: hsl(140, 80%, 49%);
            }
            
            .notification.error {
                background-color: hsl(0, 80%, 49%);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Set notification content and style
    notification.textContent = message;
    notification.className = 'notification ' + type;
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Add hover effects and animations to project cards
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 0 20px rgba(125, 25, 225, 0.7), 0 0 30px rgba(255, 255, 255, 0.7)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 0 10px rgba(125, 25, 225, 0.5), 0 0 15px rgba(255, 255, 255, 0.5)';
        });
    });
}

// Animate skills items with a delay
function animateSkillsItems() {
    const skillsItems = document.querySelectorAll('.skills-item');
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .skills-item {
            opacity: 0;
            animation: fadeInUp 0.5s ease forwards;
        }
    `;
    document.head.appendChild(style);
    
    // Trigger animation with staggered delay when skills section is in view
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            skillsItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animationDelay = `${index * 0.1}s`;
                    item.style.opacity = '1';
                }, 100);
            });
            observer.disconnect();
        }
    });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// 1. DYNAMICALLY CHANGE TEXT CONTENT
function setupDynamicTextChange() {
    // Create array of job titles to rotate through
    const jobTitles = [
        "Web Designer & Software Developer",
        "Frontend Developer",
        "UI/UX Designer",
        "Full Stack Developer"
    ];
    
    // Find job title element
    const profileName = document.querySelector('.profile-name');
    const aboutName = document.querySelector('.about-name');
    
    if (profileName && aboutName) {
        // Create a button for changing text
        const textChangeBtn = document.createElement('button');
        textChangeBtn.textContent = "Change Title";
        textChangeBtn.className = "button text-change-btn";
        textChangeBtn.style.marginTop = "1rem";
        textChangeBtn.style.width = "100%";
        
        // Add button after profile name in the about section
        const aboutSection = document.querySelector('.about');
        aboutSection.insertBefore(textChangeBtn, aboutSection.querySelector('.about-social'));
        
        let currentIndex = 0;
        
        // Event listener for button click
        textChangeBtn.addEventListener('click', function() {
            // Update to next job title
            currentIndex = (currentIndex + 1) % jobTitles.length;
            
            // Get the person's name and the new job title
            const name = "Daniel Kague";
            const newJobTitle = jobTitles[currentIndex];
            
            // Update about section name with new job title
            aboutName.textContent = `${name} - ${newJobTitle}`;
            
            // Animate the text change
            textChangeBtn.classList.add('button-clicked');
            setTimeout(() => {
                textChangeBtn.classList.remove('button-clicked');
            }, 300);
        });
        
        // Add button-clicked style
        const style = document.createElement('style');
        style.textContent = `
            .button-clicked {
                background-color: var(--accent-color);
                transform: scale(0.95);
            }
            
            .text-change-btn {
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// 2. MODIFY CSS STYLES VIA JAVASCRIPT
function setupDynamicStyleModification() {
    // Create color theme options
    const themeColors = [
        { hue: 270, name: "Purple" },    // Default
        { hue: 200, name: "Blue" },
        { hue: 340, name: "Red" },
        { hue: 160, name: "Green" },
        { hue: 40, name: "Orange" }
    ];
    
    // Create style controls container
    const styleControls = document.createElement('div');
    styleControls.className = 'style-controls';
    styleControls.innerHTML = `
        <h3>Change Theme Color</h3>
        <div class="color-buttons"></div>
    `;
    
    // Style for the controls
    const controlStyles = document.createElement('style');
    controlStyles.textContent = `
        .style-controls {
            background-color: var(--card-bg-color);
            padding: 1.5rem;
            border-radius: 1.5rem;
            margin-bottom: 2rem;
            border: 1px solid rgba(188, 140, 237, 0.5);
            box-shadow: 0 0 10px rgba(125, 25, 225, 0.5), 0 0 15px rgba(255, 255, 255, 0.5);
        }
        
        .style-controls h3 {
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .color-buttons {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        
        .color-btn {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            cursor: pointer;
            transition: transform 0.3s ease;
            border: 2px solid var(--background-color);
        }
        
        .color-btn:hover {
            transform: scale(1.2);
        }
        
        .color-btn.active {
            border: 2px solid var(--light-color);
        }
    `;
    document.head.appendChild(controlStyles);
    
    // Add controls before contact section
    const contactSection = document.getElementById('contact');
    document.querySelector('.main').insertBefore(styleControls, contactSection);
    
    // Generate color buttons
    const colorButtonsContainer = document.querySelector('.color-buttons');
    
    themeColors.forEach((color, index) => {
        const colorBtn = document.createElement('div');
        colorBtn.className = 'color-btn' + (index === 0 ? ' active' : '');
        colorBtn.style.backgroundColor = `hsl(${color.hue}, 80%, 49%)`;
        colorBtn.title = color.name;
        colorBtn.dataset.hue = color.hue;
        
        colorButtonsContainer.appendChild(colorBtn);
        
        // Add click event
        colorBtn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.color-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Change CSS variables
            document.documentElement.style.setProperty('--hue', this.dataset.hue);
            
            // Save preference to localStorage
            localStorage.setItem('theme-hue', this.dataset.hue);
        });
    });
    
    // Load saved theme color
    const savedHue = localStorage.getItem('theme-hue');
    if (savedHue) {
        document.documentElement.style.setProperty('--hue', savedHue);
        
        // Update active button
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.hue === savedHue);
        });
    }
}

// 3. ADD/REMOVE ELEMENTS WHEN BUTTON IS CLICKED
function setupAddRemoveElement() {
    // Create testimonials section
    const testimonialSection = document.createElement('section');
    testimonialSection.className = 'testimonials section';
    testimonialSection.id = 'testimonials';
    testimonialSection.innerHTML = `
        <h2 class="section-title">Client Testimonials</h2>
        <div class="testimonials-container container grid">
            <!-- Testimonials will be added here -->
        </div>
        <div class="testimonial-controls">
            <button class="button testimonial-add-btn">Add Testimonial</button>
            <button class="button btn-black testimonial-remove-btn" disabled>Remove Last</button>
        </div>
    `;
    
    // Add styles for testimonials
    const testimonialStyles = document.createElement('style');
    testimonialStyles.textContent = `
        .testimonials-container {
            display: grid;
            gap: 1.5rem;
            justify-content: center;
        }
        
        .testimonial-card {
            background-color: var(--card-bg-color);
            padding: 2rem;
            border-radius: 1.5rem;
            position: relative;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.5s ease forwards;
            border: 1px solid rgba(188, 140, 237, 0.5);
            box-shadow: 0 0 10px rgba(125, 25, 225, 0.5), 0 0 15px rgba(255, 255, 255, 0.5);
        }
        
        .testimonial-quote {
            font-size: 3rem;
            color: var(--main-color);
            position: absolute;
            top: 1rem;
            left: 1.5rem;
            opacity: 0.2;
        }
        
        .testimonial-text {
            color: var(--text-color);
            margin-bottom: 1.5rem;
            font-style: italic;
        }
        
        .testimonial-client {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .testimonial-avatar {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background-color: var(--main-color);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--light-color);
            font-weight: bold;
        }
        
        .testimonial-info h4 {
            margin-bottom: 0.2rem;
        }
        
        .testimonial-info p {
            color: var(--text-color);
            font-size: var(--smaller-font-size);
        }
        
        .testimonial-controls {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        @media screen and (min-width: 750px) {
            .testimonials-container {
                grid-template-columns: repeat(2, 350px);
            }
        }
        
        @media screen and (min-width: 1200px) {
            .testimonials-container {
                grid-template-columns: repeat(3, 350px);
            }
        }
    `;
    document.head.appendChild(testimonialStyles);
    
    // Insert testimonials section before contact section
    const contactSection = document.getElementById('contact');
    document.querySelector('.main').insertBefore(testimonialSection, contactSection);
    
    // Add to nav menu
    const navList = document.querySelector('.nav-list');
    const newNavItem = document.createElement('li');
    
    newNavItem.innerHTML = `
        <a href="#testimonials" title="Testimonials" class="nav-link">
            <i class="ri-chat-quote-line"></i>
        </a>
    `;
    
    // Insert before the contact nav item
    const contactNavItem = document.querySelector('a[href="#contact"]').parentElement;
    navList.insertBefore(newNavItem, contactNavItem);
    
    // Sample testimonials data
    const testimonials = [
        {
            text: "Daniel created an exceptional website for our bakery business. The design is beautiful and our online sales have increased significantly!",
            name: "Sarah Johnson",
            company: "Cakey Delights"
        },
        {
            text: "Working with Daniel was a pleasure. He understood our requirements perfectly and delivered a product that exceeded our expectations.",
            name: "Michael Chen",
            company: "Tech Innovations"
        },
        {
            text: "The task management app Daniel developed for our team has dramatically improved our productivity. Highly recommended!",
            name: "Jessica Williams",
            company: "Productive Teams Inc."
        },
        {
            text: "Daniel's attention to detail and creative approach set him apart. Our travel platform has received countless compliments on its design.",
            name: "Robert Garcia",
            company: "Travel Explorer"
        }
    ];
    
    const testimonialContainer = document.querySelector('.testimonials-container');
    const addBtn = document.querySelector('.testimonial-add-btn');
    const removeBtn = document.querySelector('.testimonial-remove-btn');
    
    let testimonialCount = 0;
    
    // Function to create testimonial card
    function createTestimonialCard(testimonial) {
        const card = document.createElement('article');
        card.className = 'testimonial-card';
        
        // Get initials for avatar
        const nameParts = testimonial.name.split(' ');
        const initials = nameParts.map(part => part[0]).join('');
        
        card.innerHTML = `
            <div class="testimonial-quote">
                <i class="ri-double-quotes-l"></i>
            </div>
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="testimonial-client">
                <div class="testimonial-avatar">
                    ${initials}
                </div>
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.company}</p>
                </div>
            </div>
        `;
        
        return card;
    }
    
    // Add testimonials button functionality
    addBtn.addEventListener('click', function() {
        if (testimonialCount < testimonials.length) {
            const newTestimonial = testimonials[testimonialCount];
            const testimonialCard = createTestimonialCard(newTestimonial);
            testimonialContainer.appendChild(testimonialCard);
            
            testimonialCount++;
            
            // Enable remove button when testimonials exist
            if (testimonialCount > 0) {
                removeBtn.disabled = false;
            }
            
            // Disable add button when all testimonials are added
            if (testimonialCount >= testimonials.length) {
                addBtn.disabled = true;
            }
        }
    });
    
    // Remove testimonials button functionality
    removeBtn.addEventListener('click', function() {
        if (testimonialCount > 0) {
            const cards = testimonialContainer.querySelectorAll('.testimonial-card');
            const lastCard = cards[cards.length - 1];
            
            // Add removal animation
            lastCard.style.opacity = '0';
            lastCard.style.transform = 'translateY(20px)';
            
            // Remove after animation completes
            setTimeout(() => {
                testimonialContainer.removeChild(lastCard);
                testimonialCount--;
                
                // Disable remove button when no testimonials exist
                if (testimonialCount === 0) {
                    removeBtn.disabled = true;
                }
                
                // Enable add button when there are testimonials to add
                if (testimonialCount < testimonials.length) {
                    addBtn.disabled = false;
                }
            }, 500);
        }
    });
}