document.getElementById('submitButton').addEventListener('click', function() {
  // Capture the input value
  var inputPhrase = document.getElementById('inputField').value;

  // Insert the input value into the paragraph element
  document.getElementById('displayText').innerText = inputPhrase;
});
