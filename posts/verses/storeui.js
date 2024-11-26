class StoreUI {
  static version = '1.0.0'; // Version property
  
  constructor(id = 'storeUI') {
    // Create the MAIN UI div element
    this.div = document.createElement('div');
    this.div.id = id;
    document.body.appendChild(this.div);
    
    // Create a text INPUT field
    this.inputField = document.createElement('input');
    this.inputField.type = 'text';
    this.inputField.id = 'storeUIInput';
    this.div.appendChild(this.inputField);
    
    // Create a BUTTON element
    this.button = document.createElement('button');
    this.button.id = 'storeUIButton';
    this.button.textContent = 'Click Me';
    this.div.appendChild(this.button);

    // Create an OUTPUT div element
    this.outputDiv = document.createElement('div');
    this.outputDiv.id = 'storeUIOutput';
    this.outputDiv.textContent = 'Output placeholder';
    this.div.appendChild(this.outputDiv);

    // Add an event listener to the button with bind
    this.button.addEventListener('click', this.handleButtonClick.bind(this));
    }
    
    // Method to handle button click
    handleButtonClick() {
     const inputValue = this.inputField.value;
     if (inputValue) {
      this.outputDiv.textContent = `${inputValue}`;
      this.inputField.value = ''; // Clear the input field
     } else {
      this.outputDiv.textContent = 'Please enter something!';
     }
    }
  
    // Method to set text content of the main div
    setTextContent(text) {
      this.div.textContent = text;
    }

    // Method to get the main div element
    getDiv() {
      return this.div;
    }
  }

// Usage
const myDiv = new StoreUI();
console.log(myDiv.getDiv());  // Outputs: <div id="storeUI">...</div>

/* =============================================================  



*/