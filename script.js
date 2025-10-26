// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// ===== GITHUB API INTEGRATION =====
let githubUsername = 'yenugah80'; // Default username

// Try to get username from input on page load
window.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('github-username');
    if (input) {
        input.value = githubUsername;
    }
});

async function loadGitHubProjects() {
    const usernameInput = document.getElementById('github-username');
    const username = usernameInput?.value.trim() || githubUsername;
    
    if (!username) {
        alert('Please enter a GitHub username');
        return;
    }
    
    githubUsername = username;
    
    const projectsGrid = document.getElementById('projects-grid');
    const loading = document.getElementById('projects-loading');
    
    // Show loading
    loading.style.display = 'block';
    projectsGrid.innerHTML = '';
    
    try {
        // Fetch user info
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) {
            throw new Error('User not found');
        }
        const userData = await userResponse.json();
        
        // Update stats
        document.getElementById('repos-count').textContent = userData.public_repos || 0;
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`);
        if (!reposResponse.ok) {
            throw new Error('Failed to fetch repositories');
        }
        const repos = await reposResponse.json();
        
        // Update project count
        document.getElementById('projects-count').textContent = repos.length;
        
        // Hide loading
        loading.style.display = 'none';
        
        // Display projects
        if (repos.length === 0) {
            projectsGrid.innerHTML = '<p style="text-align: center; color: var(--text-light);">No public repositories found.</p>';
            return;
        }
        
        repos.forEach(repo => {
            const projectCard = createProjectCard(repo);
            projectsGrid.appendChild(projectCard);
        });
        
    } catch (error) {
        loading.style.display = 'none';
        projectsGrid.innerHTML = `<p style="text-align: center; color: #ef4444;">Error loading projects: ${error.message}</p>`;
        console.error('Error fetching GitHub data:', error);
    }
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const description = repo.description || 'No description available';
    const language = repo.language || 'Not specified';
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${repo.name}</h3>
            <div class="project-icon">
                <i class="fab fa-github"></i>
            </div>
        </div>
        <p class="project-description">${description}</p>
        ${language !== 'Not specified' ? `<span class="project-language">${language}</span>` : ''}
        <div class="project-stats">
            <div class="project-stat">
                <i class="fas fa-star"></i>
                <span>${stars}</span>
            </div>
            <div class="project-stat">
                <i class="fas fa-code-branch"></i>
                <span>${forks}</span>
            </div>
        </div>
        <div class="project-links">
            <a href="${repo.html_url}" target="_blank" class="project-link link-primary">
                View Code
            </a>
            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="project-link link-secondary">Live Demo</a>` : ''}
        </div>
    `;
    
    return card;
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when section is visible
const statsSection = document.querySelector('.about');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectsCount = document.getElementById('projects-count');
                const reposCount = document.getElementById('repos-count');
                
                // Only animate if we have numbers
                const projectsValue = parseInt(projectsCount.textContent) || 0;
                const reposValue = parseInt(reposCount.textContent) || 0;
                
                if (projectsValue > 0) {
                    animateCounter(projectsCount, projectsValue);
                }
                if (reposValue > 0) {
                    animateCounter(reposCount, reposValue);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ===== AUTO-LOAD GITHUB PROJECTS ON PAGE LOAD =====
window.addEventListener('load', () => {
    // Auto-load projects with default username after a short delay
    setTimeout(() => {
        loadGitHubProjects();
    }, 500);
});

// ===== GLITCH EFFECT FOR HERO TEXT =====
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    setInterval(() => {
        glitchText.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0px rgba(255,0,0,0.5),
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0px rgba(0,255,0,0.5),
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0px rgba(0,0,255,0.5)
        `;
        setTimeout(() => {
            glitchText.style.textShadow = 'none';
        }, 50);
    }, 3000);
}
