function searchPost() {
    const postIdInput = document.getElementById('postId');
    const postContainer = document.getElementById('postContainer');
    const postId = parseInt(postIdInput.value);
  
    if (postId < 1 || postId > 100 || isNaN(postId)) {
      alert('Please enter a valid Post ID between 1 and 100.');
      return;
    }
  
    const fetchPost = new Promise((resolve, reject) => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => {
          if (!response.ok) {
            reject(new Error('Failed to fetch post.'));
          }
          return response.json();
        })
        .then((post) => resolve(post))
        .catch((error) => reject(error));
    });
  
    fetchPost
      .then((post) => {
        postContainer.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <button onclick="getComments(${postId})">Get Comments</button>
        `;
      })
      .catch((error) => {
        console.error(error.message);
        alert('Failed to fetch post. Please try again.');
      });
  }
  
  function getComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch comments.');
        }
        return response.json();
      })
      .then((comments) => {
        alert(`Comments: ${JSON.stringify(comments)}`);
      })
      .catch((error) => {
        console.error(error.message);
        alert('Failed to fetch comments. Please try again.');
      });
  }