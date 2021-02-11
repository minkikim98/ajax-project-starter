console.log("test");

window.addEventListener("DOMContentLoaded", async event => {
    // Phase 1: Fetches kitten picture upon first loadup
    updatePic();

    // Phase 2: New Pic Button
    let newCatButton = document.getElementById("new-pic");
    newCatButton.addEventListener("click", updatePic);

    const upvoteButton = document.getElementById('upvote');
    upvoteButton.addEventListener('click', upVote);

    const downvoteButton = document.getElementById('downvote');
    downvoteButton.addEventListener('click', downVote);

    const commentForm = document.querySelector('.comment-form')
    commentForm.addEventListener('submit', makeComment)
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

    if(res.ok){
        const json = await res.json();
        scoreDisplay.innerHTML = json.score;
    }else {
        scoreDisplay.innerHTML = 'Error'
    }
}

async function downVote() {
    const scoreDisplay = document.querySelector('.score');

    const res = await fetch('/kitten/downvote', {
        method: 'PATCH'
    });

    if(res.ok){
        const json = await res.json();
        scoreDisplay.innerHTML = json.score;
    }else {
        scoreDisplay.innerHTML = 'Error'
    }
}

async function makeComment(event) {
    event.preventDefault();
    const commentField = document.getElementById('user-comment')
    const commentForm = document.querySelector('.comment-form')
    const commentsSection = document.querySelector('.comments')

    const formData = new FormData(commentForm);
    let commentText = formData.get('user-comment')

    commentField.value = ''

    const res = await fetch('/kitten/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment: commentText
        })
    })

    const json = await res.json()
    console.log(json)
    commentsSection.innerHTML = ''

    json.comments.forEach(comment => {
        let newComment = document.createElement('div')
        newComment.innerHTML = comment;
        commentsSection.appendChild(newComment)
    })

}
