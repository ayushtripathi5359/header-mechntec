const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const sideLinks = document.querySelectorAll('.side-link:not(.logout)');

    // Check if mobile
    function isMobile() {
      return window.innerWidth <= 768;
    }

    // Toggle sidebar
    toggleBtn.addEventListener('click', () => {
      if (isMobile()) {
        sidebar.classList.toggle('mobile-open');
        mobileOverlay.classList.toggle('active');
      } else {
        sidebar.classList.toggle('collapsed');
        sidebar.classList.toggle('expanded');
      }
    });

    // Close mobile sidebar when clicking overlay
    mobileOverlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      mobileOverlay.classList.remove('active');
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (!isMobile()) {
        sidebar.classList.remove('mobile-open');
        mobileOverlay.classList.remove('active');
      }
    });

    // Active link functionality
    sideLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        sideLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close mobile sidebar after selection
        if (isMobile()) {
          sidebar.classList.remove('mobile-open');
          mobileOverlay.classList.remove('active');
        }
      });
    });

    // Search functionality
    const searchBar = document.querySelector('.search-bar');
    const searchButton = document.querySelector('.search-button');
    const searchIcon = document.querySelector('.search-icon');

    function handleSearch() {
      if (isMobile()) {
        // On mobile, show a search prompt or modal
        const query = prompt('Enter your search query:');
        if (query && query.trim()) {
          console.log('Mobile search for:', query.trim());
          // Add your search logic here
        }
      } else {
        // Desktop search functionality
        const query = searchBar?.value.trim();
        if (query) {
          console.log('Desktop search for:', query);
          // Add your search logic here
        }
      }
    }

    // Search button click (desktop)
    if (searchButton) {
      searchButton.addEventListener('click', handleSearch);
    }

    // Search bar enter key (desktop)
    if (searchBar) {
      searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      });
    }

    // Search icon click (mobile)
    if (searchIcon) {
      searchIcon.addEventListener('click', handleSearch);
    }

    // Add some interactive animations
    const cards = document.querySelectorAll('.dashboard-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Notification click handler
    document.querySelector('.notify').addEventListener('click', () => {
      alert('You have 3 new notifications!');
    });

    // Profile click handler
    document.querySelector('.profile-icon').addEventListener('click', () => {
      alert('Profile menu would open here');
    });

    // Add loading animation on page load
    document.addEventListener('DOMContentLoaded', () => {
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 100);
    });