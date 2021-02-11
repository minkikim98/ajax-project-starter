window.addEventListener("DOMContentLoaded", async event => {
    // Phase 1: Fetches kitten picture upon first loadup
    updatePic();

    // Phase 2: New Pic Button
    let newCatButton = document.getElementById("new-pic");
    newCatButton.addEventListener("click", updatePic);

    // Phase 4: Upvote and Downvote
    const upvoteButton = document.getElementById('upvote');
    upvoteButton.addEventListener('click', upVote);

    const downvoteButton = document.getElementById('downvote');
    downvoteButton.addEventListener('click', downVote);

    // Phase 5: Comments
    const commentForm = document.querySelector('.comment-form');
    commentForm.addEventListener('submit', makeComment);

    // Bonus Phase: Delete Comments
    const commentsSection = document.querySelector(".comments");
    commentsSection.addEventListener("click", deleteComment);
});

async function updatePic() {
    let loader = document.querySelector(".loader");
    loader.innerHTML = "Loading...";
    const res = await fetch("/kitten/image");
    if (res.ok) {
        const json = await res.json();
        const pick = document.querySelector(".cat-pic");
        pick.src = json.src;
    } else {
        const json = await res.json();
        let error = document.querySelector(".error");
        error.innerHTML = json.message;
    }
    loader.innerHTML = "";
}

async function upVote() {
    const scoreDisplay = document.querySelector('.score');

    const res = await fetch('/kitten/upvote', {
        method: 'PATCH'
    });

    if (res.ok) {
        const json = await res.json();
        scoreDisplay.innerHTML = json.score;
    } else {
        scoreDisplay.innerHTML = 'Error';
    }
}

async function downVote() {
    const scoreDisplay = document.querySelector('.score');

    const res = await fetch('/kitten/downvote', {
        method: 'PATCH'
    });

    if (res.ok) {
        const json = await res.json();
        scoreDisplay.innerHTML = json.score;
    } else {
        scoreDisplay.innerHTML = 'Error';
    }
}

async function makeComment(event) {
    event.preventDefault();

    const commentField = document.getElementById('user-comment');

    // Get comment text using FormData object
    const commentForm = document.querySelector('.comment-form');
    const formData = new FormData(commentForm);
    let commentText = formData.get('user-comment');
    console.log(commentText);

    // Reset comment field
    commentField.value = '';

    // Make POST request to server with comment text
    const res = await fetch('/kitten/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment: commentText
        })
    });
    
    const json = await res.json();
    updateComments(json);
}

async function deleteComment(event) {
    let element = event.target;
    if (element.nodeName === "BUTTON") {
        const res = await fetch('/kitten/comments/' + element.id, {
            method: 'DELETE'
        });
        const json = await res.json();
        updateComments(json);
    }
}

function updateComments(json) {
    const commentsSection = document.querySelector('.comments');
    commentsSection.innerHTML = '';
    json.comments.forEach((comment, index) => {
        let newComment = document.createElement("div");

        let newCommentText = document.createElement('span');
        newCommentText.innerHTML = comment;
        newComment.appendChild(newCommentText);

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete Comment";
        deleteButton.setAttribute("id", index.toString());
        newCommentText.appendChild(deleteButton);

        commentsSection.appendChild(newComment);
    });
}
