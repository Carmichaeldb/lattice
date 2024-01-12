const ratePost = function (postId, rating) {
  fetch('/posts/' + postId + '/rating', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers like authentication tokens if required
    },
    body: JSON.stringify({ rating: rating })
  })
    .then(response => {
      if (response.ok) {
        console.log('Rating submitted successfully');
        // Optionally, refresh the page or update the UI
        window.location.reload();
      } else {
        console.error('Error submitting rating');
      }
    })
    .catch(err => console.error('Network error:', err));
};

const loginMessage = function () {
  alert("Please login.");
};
