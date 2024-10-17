document.getElementById('submitButton2').addEventListener('click', function() {
  // Capture the input value
  var param_string = document.getElementById('inputRef').value;
  var url = "https://jsfapi.netlify.app/.netlify/functions/bgw?param=" + param_string;

  // set src attribute in iframe element
  document.getElementById('frame2').src = url;
});
