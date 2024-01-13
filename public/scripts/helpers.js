const ratePost = function (postId, rating) {
  fetch('/posts/' + postId + '/rating', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rating: rating })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error submitting rating');
      }
      window.location.replace('/posts/' + postId);
    })
    .catch(err => console.error('Error:', err));
};

const toggleLike = function (postId) {
  fetch('/posts/' + postId + '/like', {
    method: 'POST'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error submitting like');
      }
      window.location.replace('/posts/' + postId);
    })
    .catch(error => console.error('Error:', error));
};

const loginMessage = function () {
  alert("Please login.");
};
