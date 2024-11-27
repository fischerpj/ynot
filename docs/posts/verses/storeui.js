// StorageObject CLASS, setter & getter 
class StorageObject {
  #accu;
  #lastvalue;
  
  constructor(key, initialvalue, reset= false) {
    this.version = 0.91;
    this.key = key;
    this.#lastvalue = initialvalue; // Using _value to indicate it's a private property

    // create & initialize an array
    if (reset) {
      this.#accu = [];
    } else {
      // retrieve previous store
      this.#accu = JSON.parse(localStorage.getItem(this.key));
    }
    // accumulate the new value
    this.#accu.push(this.#lastvalue);

    // Save the accumulated object to localStorage
    localStorage.setItem(this.key, JSON.stringify(this.#accu));
  }  
    
  // Getter for the value property
  get lastvalue() {
    return this.#lastvalue;
  }
  
  get accu() {
    return JSON.parse(localStorage.getItem(this.key));
  }
  
  set accu(newValue) {
    this.#lastvalue = newValue;
    this.#accu.push(newValue);
    // side-effect, Save the object to localStorage
    localStorage.setItem(this.key, JSON.stringify(this.#accu));
  }
} // end of class


/* ===========================================================================*/


class StoreUI {
  static version = '1.0.0'; // Version property
  
  constructor(id = 'storeUI', storageObject) {
    
    this.storageObject = storageObject; // Store the storageObject instance

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

/*    
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
*/    
      // Method to handle button click
    handleButtonClick() {
     const inputValue = this.inputField.value;
     if (inputValue) {
      this.storageObject.accu = inputValue;
      console.log("pfui: " + this.storageObject.accu.toString);
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
const myStorage = new StorageObject('myKey', 'gen2:4', true);
myStorage.accu = "tutoi";
console.log(myStorage.accu.toString());

// Usage
const myDiv = new StoreUI(id = 'storeUI', myStorage);
console.log(myDiv.getDiv());  // Outputs: <div id="storeUI">...</div>

/* =============================================================  

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


*/