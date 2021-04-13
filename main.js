// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", event => {
    for (article of document.querySelectorAll('.media-post')) {
        let likeButton = article.querySelector('.like-glyph');
        
        likeButton.addEventListener('click', event => {
            event.preventDefault();
            mimicServerCall()
            .then(resp => {
                switch (likeButton.innerText) {
                    case FULL_HEART:
                        likeButton.innerText = EMPTY_HEART;
                        likeButton.classList.remove('activated-heart');
                        break;
                    default:
                        likeButton.innerText = FULL_HEART;
                        likeButton.classList.add('activated-heart');
                        break;
                }
            }).catch(error => errorHandler(error));
        });
    }
});

let errorHandler = error => {
    let errorModal = document.querySelector('#modal');
    errorModal.querySelector('#modal-message').innerText = error;
    errorModal.classList.remove('hidden');
    setTimeout(() => errorModal.classList.add('hidden'), 3000);
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            let isRandomFailure = Math.random() < .2
            if (isRandomFailure) {
                reject("Random server error. Try again.");
            } else {
                resolve("Pretend remote server notified of action!");
            }
        }, 300);
    });
}
