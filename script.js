const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const navbarLinks = document.querySelectorAll('.navbar a');
const header1 = document.querySelector('.header1'); // Selecting header1 element

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        header1.classList.add('dark-mode'); // Adding dark-mode class to header1
        navbarLinks.forEach(link => {
            link.style.color = '#fff'; // Set anchor text color for dark mode
        });
    } else {
        body.classList.remove('dark-mode');
        header1.classList.remove('dark-mode'); // Removing dark-mode class from header1
        navbarLinks.forEach(link => {
            link.style.color = ''; // Reset anchor text color
        });
    }
});
