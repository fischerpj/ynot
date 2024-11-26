// Function to get the value from localStorage
function getLocalStorageValue() {
  
    // Retrieve the value associated with the key 'accuref'
    const value = localStorage.getItem('accuref');

    // Insert the input value into the paragraph element
    document.getElementById('displayArea').innerText = value;
}

// Add an event listener for the window's load event
window.addEventListener('load', getLocalStorageValue, false) ;

// SET LocalStorage

document.getElementById('storeButton').addEventListener('click', function() {
  
  // Capture the input value
  var inputPhrase = document.getElementById('inputRef').value;

  // Retrieve the value associated with the key 'accuref'
  const value = JSON.parse(localStorage.getItem('accuref'));
  const value_accu = {inputPhrase, value};
    
  // Save the object to localStorage
  localStorage.setItem('accuref', value_accu);

  // Insert the input value into the paragraph element
  document.getElementById('displayArea').innerText = JSON.stringify(value_accu);
});