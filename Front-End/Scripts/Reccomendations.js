const progressCircle = document.querySelector(".progress");
const progressText = document.getElementById("progress-text");
const loadingScreen = document.getElementById("loadingScreen");
const contentContainer = document.getElementById("contentContainer");

let progress = 0;

function updateProgress() {
    if (progress <= 100) {
        progressText.textContent = progress + "%";
        progressCircle.style.strokeDashoffset = 283 - (progress / 100) * 283;
        progress += 5;
        setTimeout(updateProgress, 100);
    } else {
        loadingScreen.style.display = "none";  
        contentContainer.style.display = "block"; 
        loadRecommendations();
    }
}

function loadRecommendations() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_Id');

    if (userId) {
        fetch('http://localhost:3000/Recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Full API response:", data);

            if (data.error) {
                throw new Error(data.error);
            }

            // AI Recommendations
            document.getElementById('aiRecommendations').textContent = data.recommendations || "No AI recommendations generated";

            // Exercises
            const exerciseList = document.getElementById('exerciseList');
            console.log("Exercise data:", data.exercises);
            exerciseList.innerHTML = data.exercises.length > 0 
                ? data.exercises.map(ex => `
                    <li>
                        <strong>${ex.name || 'Unnamed Exercise'}</strong>
                        <p>${ex.description || 'No description available'}</p>
                        <em>Category: ${ex.category || 'Uncategorized'}</em>
                    </li>`).join('')
                : '<li class="error">No exercises found matching your profile</li>';

            // Products
            const productList = document.getElementById('productList');
            console.log("Product data:", data.products);
            productList.innerHTML = data.products.length > 0
                ? data.products.map(prod => `
                    <li>
                        <strong>${prod.name || 'Unnamed Product'}</strong>
                        <p>${prod.description || 'No description available'}</p>
                        <em>Price: $${prod.price}</em>
                    </li>`).join('')
                : '<li class="error">No products found matching your profile</li>';

            document.querySelector('.status').textContent = 'Recommendations loaded.';
            document.querySelector('.status').classList.replace('loading', 'success');
        })
        .catch(error => {
            console.error("CLIENT ERROR:", error);
            document.querySelector('.status').textContent = error.message || 'Failed to load recommendations.';
            document.querySelector('.status').classList.replace('loading', 'error');
        });
    } else {
        document.querySelector('.status').textContent = 'User ID not found.';
        document.querySelector('.status').classList.replace('loading', 'error');
    }
}

updateProgress();