/**
 * ═══════════════════════════════════════════════════════════
 * PORTFOLIO — Main JavaScript
 * ═══════════════════════════════════════════════════════════
 * 
 * This file handles:
 * 1. Mobile navigation toggle
 * 2. Navbar scroll effect
 * 3. Current year in footer
 * 4. Form success message
 * 5. Smooth scroll for anchor links
 * 
 * 🔒 SECURITY NOTES:
 * - No external libraries loaded (reduces attack surface)
 * - No eval() or innerHTML with user input (prevents XSS)
 * - No sensitive data in this file
 * - All DOM manipulation uses safe methods
 * ═══════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────
// Wait for DOM to be fully loaded before running any code
// ─────────────────────────────────────────────────────────
/*
  WHAT: DOMContentLoaded fires when HTML is parsed.
  WHY:  If JavaScript runs before HTML is loaded, it can't 
        find elements like buttons or menus. This ensures 
        everything exists before we try to use it.
*/
document.addEventListener('DOMContentLoaded', function () {

    // ═══════════════════════════════════════════════════
    // 1. MOBILE NAVIGATION TOGGLE
    // ═══════════════════════════════════════════════════
    /*
      WHAT: Opens/closes the mobile menu when hamburger is clicked.
      WHY:  On small screens, the full nav is hidden. The hamburger 
            button toggles it visible/hidden.
    */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            // Toggle the 'active' class on the nav links
            const isOpen = navLinks.classList.toggle('active');

            // Update aria-expanded for screen readers
            // This tells assistive technology whether the menu is open
            navToggle.setAttribute('aria-expanded', isOpen.toString());

            // Animate hamburger to X shape
            navToggle.classList.toggle('is-active');
        });

        // Close menu when a link is clicked (mobile UX)
        navLinks.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('is-active');
            });
        });

        // Close menu when clicking outside of it
        document.addEventListener('click', function (event) {
            /*
              WHAT: Check if the click was outside the nav.
              WHY:  Users expect menus to close when they click elsewhere.
              
              .contains() checks if the clicked element is inside the nav.
              If it's not inside navLinks AND not inside navToggle, close it.
            */
            if (!navLinks.contains(event.target) && 
                !navToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('is-active');
            }
        });
    }


    // ═══════════════════════════════════════════════════
    // 2. NAVBAR SCROLL EFFECT
    // ═══════════════════════════════════════════════════
    /*
      WHAT: Adds a shadow to the navbar when user scrolls down.
      WHY:  Visual feedback that the navbar is "floating" above 
            the content. Common modern web pattern.
    */
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        /*
          PERFORMANCE NOTE: 
          We use a simple scroll listener here. For a production 
          site with heavy scroll handling, you'd use 
          IntersectionObserver or requestAnimationFrame.
          For this portfolio, the simple approach is fine.
        */
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
        /*
          { passive: true }
          WHAT: Tells the browser this scroll handler won't 
                call preventDefault().
          WHY:  Improves scroll performance. The browser can 
                optimize scrolling because it knows we won't 
                try to block it.
        */
    }


    // ═══════════════════════════════════════════════════
    // 3. CURRENT YEAR IN FOOTER
    // ═══════════════════════════════════════════════════
    /*
      WHAT: Automatically sets the copyright year.
      WHY:  You'll never have to manually update "© 2025" to 
            "© 2026" — it updates automatically.
      
      🔒 SECURITY: We use textContent instead of innerHTML.
      textContent is safe because it treats everything as plain text,
      never executing any HTML or scripts.
    */
    const yearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(function (element) {
        element.textContent = currentYear;
    });


    // ═══════════════════════════════════════════════════
    // 4. FORM SUCCESS MESSAGE
    // ═══════════════════════════════════════════════════
    /*
      WHAT: Shows a success message after form submission.
      WHY:  FormSubmit redirects back to your page with ?sent=true 
            in the URL. We detect this and show the message.
      
      HOW IT WORKS:
      1. User fills form → clicks submit
      2. FormSubmit processes it and sends you an email
      3. FormSubmit redirects to: contact.html?sent=true
      4. This code detects "sent=true" in the URL
      5. Shows the success message, hides the form
    */
    const urlParams = new URLSearchParams(window.location.search);
    /*
      URLSearchParams: A built-in browser API to read URL parameters.
      Example: if URL is "contact.html?sent=true&name=John"
               urlParams.get('sent') returns "true"
               urlParams.get('name') returns "John"
    */

    if (urlParams.get('sent') === 'true') {
        const form = document.getElementById('contactForm');
        const successMsg = document.getElementById('formSuccess');

        if (form && successMsg) {
            form.hidden = true;      // Hide the form
            successMsg.hidden = false; // Show success message

            // Clean the URL (remove ?sent=true) without page reload
            /*
              WHAT: window.history.replaceState changes the URL 
                    without reloading the page.
              WHY:  If user refreshes, they shouldn't see the 
                    success message again. Clean URL also looks 
                    more professional.
            */
            window.history.replaceState({}, '', window.location.pathname);
        }
    }


    // ═══════════════════════════════════════════════════
    // 5. ESCAPE KEY CLOSES MOBILE MENU
    // ═══════════════════════════════════════════════════
    /*
      WHAT: Pressing Escape key closes the mobile menu.
      WHY:  Keyboard accessibility. Users expect Escape to 
            close overlays and menus.
    */
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && navLinks && navToggle) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('is-active');
                navToggle.focus(); // Return focus to the toggle button
            }
        }
    });

});
