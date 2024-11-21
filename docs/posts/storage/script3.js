document.getElementById('getButton').addEventListener('click', function() {

  // Retrieve the object from localStorage
  const savedUser = JSON.parse(localStorage.getItem('my_input'));

  // Insert the input value into the paragraph element
  document.getElementById('retrievedText').innerText = savedUser;
});
