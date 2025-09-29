// Dark Mode Toggle Functionality
class DarkModeToggle {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.toggleButton = null;
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.theme);
        
        // Create toggle button
        this.createToggleButton();
        
        // Add event listener
        this.toggleButton.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        this.watchSystemTheme();
    }

    createToggleButton() {
        // Create toggle button element
        this.toggleButton = document.createElement('button');
        this.toggleButton.className = 'dark-mode-toggle';
        this.toggleButton.setAttribute('aria-label', 'Toggle dark mode');
        this.toggleButton.setAttribute('title', 'Toggle dark mode');
        
        // Add to navigation
        const nav = document.querySelector('.nav-links');
        if (nav) {
            nav.appendChild(this.toggleButton);
        }
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update button state
        if (this.toggleButton) {
            this.toggleButton.setAttribute('aria-pressed', theme === 'dark');
        }
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add animation class for smooth transition
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
        
        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: newTheme }
        }));
    }

    watchSystemTheme() {
        // Check if user prefers dark mode
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Listen for system theme changes
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        // Set theme color based on current theme
        metaThemeColor.content = theme === 'dark' ? '#1e1e2e' : '#667eea';
    }

    // Public method to get current theme
    getCurrentTheme() {
        return this.theme;
    }

    // Public method to set theme programmatically
    setThemeProgrammatically(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.setTheme(theme);
        }
    }
}

// Initialize dark mode toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeToggle = new DarkModeToggle();
});

// Enhanced scroll effect for header with theme awareness
function updateHeaderOnScroll() {
    const header = document.querySelector('header');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 100) {
        if (currentTheme === 'dark') {
            header.style.background = 'rgba(30, 30, 46, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        }
    } else {
        if (currentTheme === 'dark') {
            header.style.background = 'rgba(30, 30, 46, 0.95)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
}

// Update scroll effect when theme changes
window.addEventListener('themeChanged', () => {
    updateHeaderOnScroll();
});

// Enhanced typing effect with theme awareness
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Enhanced ripple effect with theme awareness
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add theme-aware ripple color
    const currentTheme = document.documentElement.getAttribute('data-theme');
    ripple.style.background = currentTheme === 'dark' 
        ? 'rgba(255, 255, 255, 0.2)' 
        : 'rgba(255, 255, 255, 0.3)';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeToggle;
}
