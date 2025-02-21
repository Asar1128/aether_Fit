$(document).ready(function() {
    // Initialize the Slick slider
    $('.reivews-slider').slick({
        dots: true,
        infinite: false,
        variableWidth: true,
        arrows: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Sidebar functionality
    const checkbox = document.getElementById('side-nav-btn');
    const sidebar = document.querySelector('.side-bar-navigation');
    const navCloseBtn = document.getElementById('nav_close_btn');

    function updateSidebar() {
        if (checkbox.checked) {
            sidebar.style.display = 'block';
            sidebar.style.opacity = '1';
            sidebar.style.pointerEvents = 'auto'; 
            sidebar.style.transition = 'opacity 300ms ease-in';
        } else {
            sidebar.style.opacity = '0';
            sidebar.style.pointerEvents = 'none'; 
            setTimeout(() => {
                sidebar.style.display = 'none'; 
            }, 300);
        }
    }

  
    checkbox.addEventListener('change', updateSidebar);

    // Event listener for close button
    navCloseBtn.addEventListener('click', () => {
        checkbox.checked = false; 
        updateSidebar(); 
    });

  
    updateSidebar();
});