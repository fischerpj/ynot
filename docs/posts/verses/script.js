// Function to get the value from localStorage
function getLocalStorageValue() {
    // Retrieve the value associated with the key 'myKey'
    const value = localStorage.getItem('my_input');
    console.log('Value from localStorage:', value);
}

// Add an event listener for the window's load event
window.addEventListener('load', getLocalStorageValue);

// SET LocalStorage

document.getElementById('submitButton').addEventListener('click', function() {
  // Capture the input value
  var inputPhrase = document.getElementById('inputField').value;

  // Save the object to localStorage
  localStorage.setItem('my_input', JSON.stringify(inputPhrase));

  // Insert the input value into the paragraph element
  document.getElementById('displayText').innerText = inputPhrase;
});

// GET LocalStorage

document.getElementById('getButton').addEventListener('click', function() {

  // Retrieve the object from localStorage
  const savedUser = JSON.parse(localStorage.getItem('my_input'));

  // Insert the input value into the paragraph element
  document.getElementById('retrievedText').innerText = savedUser;
});
