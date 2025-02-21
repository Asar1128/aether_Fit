let lb2Input = document.getElementById("lb2-Input");
let lb1Input = document.getElementById("lb1-Input");
let activebtn = document.getElementById("main-btn");
const continueBtn = document.getElementById("continue-btn");
let bothButtons = document.querySelectorAll(".height-unit-btn");
let inputElement1 = document.getElementById("lb1-Input");
let inputElement2 = document.getElementById("lb2-Input");
let label1 = document.querySelector(".change1");
let label2 = document.querySelector(".change2");

bothButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        let clickedButton = event.target;
        if (activebtn !== clickedButton) {
            activebtn.classList.remove("active");
            clickedButton.classList.add("active");
            activebtn = clickedButton;
        }

        let originalValue1 = parseFloat(lb1Input.value);
        let originalValue2 = parseFloat(lb2Input.value);

        if (activebtn.id === "main-btn") {
            inputElement1.placeholder = "__lbs";
            inputElement2.placeholder = "__lbs";
            label1.textContent = "Current Weight (lb)";
            label2.textContent = "Target Weight (lb)";
            if (!isNaN(originalValue1)) {
                lb1Input.value = Math.round(originalValue1 * 2.20462); // kg to lb
            }
            if (!isNaN(originalValue2)) {
                lb2Input.value = Math.round(originalValue2 * 2.20462); // kg to lb
            }
        } else if (activebtn.id === "main1-btn") {
            inputElement1.placeholder = "__kg";
            inputElement2.placeholder = "__kg";
            label1.textContent = "Current Weight (kg)";
            label2.textContent = "Target Weight (kg)";
            if (!isNaN(originalValue1)) {
                lb1Input.value = Math.round(originalValue1 / 2.20462); // lb to kg
            }
            if (!isNaN(originalValue2)) {
                lb2Input.value = Math.round(originalValue2 / 2.20462); // lb to kg
            }
        }
    });

    continueBtn.addEventListener("click", function () {
        let input1 = lb1Input.value.trim();
        let input2 = lb2Input.value.trim();
        if (input1 && input2 !== "") {
            window.location.href = "quiz10to11.html";
        }
    });
});

function handle1input() {
    let input1Value = lb1Input.value;
    if (input1Value.length > 3) {
        lb1Input.value = input1Value.slice(0, 3);
    }
}

function handle2input() {
    let input2Value = lb2Input.value;
    if (input2Value.length > 3) {
        lb2Input.value = input2Value.slice(0, 3);
    }
}
