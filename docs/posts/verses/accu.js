class StorageObject {
  #accu;
  
  constructor(initialValue) {
    this.#accu = initialValue;
  }
  
  // Getter for accu
  get accu() {
    return this.#accu;
  }
  
  // Setter for accu
  set accu(newValue) {
    this.#accu = newValue;
  }
  
  // Method to accumulate a new value (for demonstration purposes)
  accumulateValue(additionalValue) {
    if (typeof additionalValue === 'number' && typeof this.#accu === 'number') {
        this.#accu += additionalValue;
  } else if (typeof additionalValue === 'string' && typeof this.#accu === 'string') {
             this.#accu += additionalValue;
} else {
  throw new Error('Types of accu and additionalValue must match.');
}
}
}

class StoreUI {
  constructor(id = 'storeUI', storageObject) {
    this.div = document.createElement('div');
    this.div.id = id;
    document.body.appendChild(this.div);
    
    this.storageObject = storageObject; // Store the storageObject instance
    
    // Create a text input field
    this.inputField = document.createElement('input');
    this.inputField.type = 'text';
    this.inputField.id = 'storeUIInput';
    this.div.appendChild(this.inputField);
    
    // Create a button element
    this.button = document.createElement('button');
    this.button.id = 'storeUIButton';
    this.button.textContent = 'Click Me';
    this.div.appendChild(this.button);
    
    // Create an output div element
    this.outputDiv = document.createElement('div');
    this.outputDiv.id = 'storeUIOutput';
    this.div.appendChild(this.outputDiv);
    
    // Add an event listener to the button with bind
    this.button.addEventListener('click', this.handleButtonClick.bind(this));
  }
  
  // Method to handle button click
  handleButtonClick() {
    const inputValue = this.inputField.value;
    if (inputValue) {
      this.storageObject.accumulateValue(inputValue);
      this.outputDiv.textContent = `Stored value: ${this.storageObject.accu}`;
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
const storage = new StorageObject('');
const myDiv = new StoreUI('myDivId', storage);
console.log(myDiv.getDiv());  // Outputs: <div id="myDivId">...</div>
  console.log(StorageObject.version);  // Outputs: 1.0.0 if version is added as static property
