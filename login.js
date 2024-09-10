// Handle login submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    const message = document.getElementById('loginMessage');
    message.style.color = 'green';
    message.textContent = 'Welcome! Login successful.';

    // Increment the visit count
    updateVisitCount();

    // Redirect to another page if needed, or display something else
    // Example:
    // setTimeout(() => {
    //     window.location.href = "todo.html";
    // }, 1000);
});

// Function to get cookie value
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to set cookie for visit count
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Update visit count in cookies and display it
function updateVisitCount() {
    let visitCount = parseInt(getCookie("visit")) || 0;
    visitCount++;
    setCookie("visit", visitCount, 30); // Set cookie for 30 days
    displayVisitCount();
}

// Display visit count
function displayVisitCount() {
    const visitCount = getCookie("visit") || 0;
    document.getElementById("visit-count").innerText = `Number of logins: ${visitCount}`;
}

// Display visit count on page load (if necessary)
window.onload = function() {
    displayVisitCount();
};
