// scriptUI.js

class StorageUI {
  #div;
  #version;

  constructor() {
    // Create a div element
    this.#version = "0.0.1";
    this.#div = document.createElement('div');
    
    // Set the id of the div
    this.#div.id = 'storageUI';
    
    // Create an input field
    const inputField = document.createElement('input');
    inputField.type = 'text';         // Set the input type to text
    inputField.id = 'storageInput';   // Optionally set an id for the input field
    inputField.placeholder = "type _ref_ here";
    
    // Create a button 
    const button = document.createElement('button'); 
    button.id = 'storageButton'; 
    // Set the id of the button 
    button.textContent = 'Submit';
    
    // Append the input field to the div
    this.#div.appendChild(inputField);
    this.#div.appendChild(button);
    
    // Insert the div before the end of the body
    document.body.appendChild(this.#div);
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
const storageUI = new StorageUI();
console.log(storageUI.getDiv());  // Outputs the div element with the input field inside
