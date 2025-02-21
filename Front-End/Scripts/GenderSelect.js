// Extract userId from URL and set to hidden input
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_Id'); 
document.getElementById('userId').value = userId;
console.log(userId)

// Gender radio buttons and hidden input for gender
const maleInput = document.querySelector('.male-input');
const femaleInput = document.querySelector('.female-input');
const genderHiddenInput = document.getElementById('gender');

// Terms checkbox and error message elements
const checkBox = document.querySelector(".input-check");
const displayErrorMessage = document.querySelector('.error-message');
const form = document.getElementById('gender-form');

// Function to check if terms are accepted and gender is selected
function checkPolicyAndGender() {
    if (checkBox.checked) {
        displayErrorMessage.style.display = 'none'; 
        if (maleInput.checked || femaleInput.checked) {
            console.log(`Gender: ${maleInput.checked ? 'M' : 'F'}`);
            return true; 
        } else {
            displayErrorMessage.textContent = "Please select a gender."; 
            displayErrorMessage.style.display = 'block';
            return false;
        }
    } else {
        displayErrorMessage.textContent = "You must accept the terms and conditions."; 
        displayErrorMessage.style.display = 'block'; 
        return false;
    }
}

// Event listener for form submission
form.addEventListener('submit', (event) => {
    if (!checkPolicyAndGender()) {
        event.preventDefault(); 
    }
});

// Update hidden gender input when a radio button is selected
maleInput.addEventListener('change', () => {
    if (maleInput.checked) {
        genderHiddenInput.value = "M"; 
    }
});

femaleInput.addEventListener('change', () => {
    if (femaleInput.checked) {
        genderHiddenInput.value = "F"; 
    }
});
