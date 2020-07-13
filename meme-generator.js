
// memes is an array of objects. 
const INITIAL_STATE = { memes: [] };

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SUBMIT_MEME":
      return { ...state, memes: [...state.memes, action.newMeme] };
    case "DELETE_MEME":
      let filteredMemes = state.memes.filter( meme => meme.id !== action.id );
      return { ...state, memes: filteredMemes };
    default:
      return state;
  };
};

const store = Redux.createStore(reducer);


window.onload = function () {
  let idCounter = 0;
  document.querySelector("form").addEventListener("submit", (evt) => {
    evt.preventDefault();
    // get the form data
    const imageURL = document.querySelector('#imageURL').value;
    const topText = document.querySelector('#topText').value;
    const bottomText = document.querySelector('#bottomText').value;

    // action for submitting . newMeme is an object with the inputs from the form.
    store.dispatch({ type: "SUBMIT_MEME", newMeme: { topText, bottomText, imageURL, id: idCounter} });
    let memesArray = store.getState().memes; // not currently being used.

    // TODO: loop through memesArray to generate DOM elements for each meme. (clear container before looping.)
    const wrapper = document.createElement('div');
    const memeDiv = document.createElement('div');
    const image = document.createElement('img');
    const top = document.createElement('div');
    const bottom = document.createElement('div');
    const deleteButton = document.createElement('button');

    // for styling... 
    memeDiv.className = "meme";
    top.className = "text";
    bottom.className = "text";
    wrapper.className = 'wrapper';
    deleteButton.className = 'delete';
    image.setAttribute('src', imageURL);
    image.setAttribute('class', 'memeImage');
    top.setAttribute('id', 'top');
    bottom.setAttribute('id', 'bottom');
    memeDiv.setAttribute('id', idCounter);
    top.innerText = topText.toUpperCase();
    bottom.innerText = bottomText.toUpperCase();
    deleteButton.innerText = "X";

    wrapper.append(top, bottom, deleteButton);
    memeDiv.append(image, wrapper);
    document.querySelector("#meme-collection").append(memeDiv);

    idCounter++;
  });
 
  document.querySelector("#meme-collection").addEventListener('click', function(evt) {
    const btns = document.querySelectorAll('.delete');
    for (var btn of btns) {
        if (evt.target === btn) {
          let id = +(evt.target.parentElement.parentElement.id);
          store.dispatch({ type: "DELETE_MEME" , id});
          evt.target.parentElement.parentElement.remove();
        }
    }   
});

};




