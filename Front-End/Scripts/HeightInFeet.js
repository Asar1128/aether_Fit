const heightInputFtIn = document.getElementById('height-input-ft-in');
const heightInputCm = document.getElementById('height-input-cm');
const heightLabel = document.getElementById('height-label');
let activeButton = document.getElementById('main-btn');
const feetValue = document.getElementById("feet")
function toggleActive(event) {
  const clickedButton = event.target;

  if (activeButton !== clickedButton) {
    activeButton.classList.remove('active');
    clickedButton.classList.add('active');
    activeButton = clickedButton;

    if (clickedButton.id === 'main-btn') {
      heightInputFtIn.style.display = 'block';
      heightInputCm.style.display = 'none';
      heightLabel.textContent = 'Height (ft / in)';
    } else {
      heightInputFtIn.style.display = 'none';
      heightInputCm.style.display = 'block';
      heightLabel.textContent = 'Height (cm)';
    }
  }
}


const buttons = document.querySelectorAll('.height-unit-btn button');
buttons.forEach(button => {
  button.addEventListener('click', toggleActive);
});

// Conversion Logic
function convertToCm() {
  const feet = parseFloat(document.getElementById('feet').value) || 0;
  const inches = parseFloat(document.getElementById('inches').value) || 0;
  const totalInches = feet * 12 + inches;
  const cm = (totalInches * 2.54).toFixed(2);
  document.getElementById('centimeters').value = cm;
}

function convertToFtIn() {
  const cm = parseFloat(document.getElementById('centimeters').value) || 0;
  const totalInches = (cm / 2.54).toFixed(2);
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  document.getElementById('feet').value = feet;
  document.getElementById('inches').value = inches;
}
const ContinueBtn = document.getElementById('continue-btn')
// Add event listener to Continue button
ContinueBtn.addEventListener('click', () => {
    const heightValue = feetValue.value.trim(); 
    
    if (heightValue === "") {
      console.log("Input is empty");
    } else {
      console.log("click");
      window.location.href = ""; 
    }
  });
  

  feetValue.addEventListener('input', () => {
    if (feetValue.value.trim() === "") {
      ContinueBtn.disabled = true;
    } else {
      ContinueBtn.disabled = false;
    }
  });
  

  
