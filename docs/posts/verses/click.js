class MyButtonHandler {
  constructor(buttonId) {
    // Select the button element by its ID
    this.button = document.getElementById(buttonId);

    // Bind the event listener to the button
    this.button.addEventListener('click', this.handleClick.bind(this));
  }

  // Define the event handler method
  handleClick(event) {
    console.log('Button was clicked!', event);
  }
}

// Create an instance of the class and pass the button ID
const buttonHandler = new MyButtonHandler('myButton');
