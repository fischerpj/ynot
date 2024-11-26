// scriptUI.js

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

class StorageUI {
  #div;
  #newDiv;
  #version;
  #storageObject;
  inputField;
  button;

  constructor(storageObject) {
    this.#storageObject = storageObject;
    this.#version = "0.0.1";

    // Create a second div element for OUTPUT
    this.#newDiv = document.createElement('div');
    this.#newDiv.innerHTML = 'TOTO, This is a new div element';
    
    // Create a first div element for INPUT
    this.#div = document.createElement('div');
    // Set the id of the div
    this.#div.id = 'storageUI';
    
    // Create an INPUT field
    this.inputField = document.createElement('input');
    this.inputField.type = 'text';         // Set the input type to text
    this.inputField.id = 'storageInput';   // Optionally set an id for the input field
    this.inputField.placeholder = "type _ref_ here";
    
    // Create a BUTTON 
    this.button = document.createElement('button'); 
    this.button.id = 'storageButton'; 
    // Set the id of the button 
    this.button.textContent = 'Submit';
    
    // Append the INPUT field and the button to the div
    this.#div.appendChild(this.inputField);
    this.#div.appendChild(this.button);
    // Insert the div before the end of the body
    document.body.appendChild(this.#div);
    
    // Insert the OUTPUT div before the end of the body
    document.body.appendChild(this.#newDiv);
    
    this.addClickEvent();
  }

  addClickEvent() {
    this.button.addEventListener('click', () => this.updateContent());
  }

  updateContent() {
    // Add some content to the new div
    const inputValue = this.inputField.value;
      if (inputValue) {
        this.#storageObject.accu(inputValue);
        this.inputField.value = ''; // Clear the input field
        this.#newDiv.innerHTML = this.#storageObject.accu;
        console.log(this.#storageObject.accu); // Log the accumulated array
      }
  }
            
  // Optional method to access the private div if needed
  getDiv() {
    return this.#div;
  }
  
   getVersion() {
    return this.#version;
  }
}

// Usage
const myStorage = new StorageObject('myKey', 'gen2:4', true);
myStorage.accu = "tutoi";

console.log(myStorage.accu.toString());

const storageUI = new StorageUI(myStorage);

console.log(storageUI.getDiv());  // Outputs the div element with the input field inside

