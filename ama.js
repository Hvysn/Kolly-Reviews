let reviews = []; // Store the reviews here

// Handle star rating selection
const stars = document.querySelectorAll('.star');
let selectedRating = 0; // Store the selected rating

// Add click event to each star for rating
stars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-value')); // Convert to number
        updateStars(selectedRating);
        document.getElementById('rating-value').innerText = `Rating: ${selectedRating}`;
    });

    // Add hover effect for previewing rating
    star.addEventListener('mouseover', () => {
        updateStars(parseInt(star.getAttribute('data-value'))); // Convert to number
    });

    star.addEventListener('mouseout', () => {
        if (selectedRating === 0) {
            updateStars(0); // Reset to default if no rating selected
        } else {
            updateStars(selectedRating);
        }
    });
});

// Update star icons based on the selected rating
function updateStars(rating) {
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value')); // Convert to number
        star.textContent = starValue <= rating ? '★' : '☆';
    });
}

// Handle review submission
document.getElementById('submit-review').addEventListener('click', () => {
    const reviewText = document.getElementById('review-input').value.trim();
    
    // Only submit if there is text and a rating
    if (reviewText && selectedRating > 0) {
        const review = {
            rating: selectedRating,
            text: reviewText
        };

        // Add review to the reviews array
        reviews.push(review);
        displayReviews();
        
        // Clear input fields after submission
        document.getElementById('review-input').value = '';
        selectedRating = 0;
        updateStars(0); // Reset stars
        document.getElementById('rating-value').innerText = 'Rating: 0';
    } else {
        alert('Please provide a rating and a review.');
    }
});

// Display the reviews in the container
function displayReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = ''; // Clear previous reviews

    reviews.forEach((review) => {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
        reviewDiv.innerHTML = `
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p class="review-text">${review.text}</p>
        `;
        reviewsContainer.appendChild(reviewDiv);
    });
}
