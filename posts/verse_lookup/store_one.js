class BibRef {
  constructor(ref = 'gen1:1') {
    this.ref = ref;
    this.urlbase = 'https://jsfapi.netlify.app/.netlify/functions/bgw';
    this._response = null; // Initialize the response property to null
  }

  // Getter for ref
  get reference() {
    return this.ref;
  }

  // Setter for ref
  set reference(newRef) {
    this.ref = newRef;
  }

  // Getter for response
  get response() {
    return this._response;
  }

  // Method to get the full URL with ?param=$ref
  getFullUrl() {
    return `${this.urlbase}?param=${this.ref}`;
  }

  // Method to fetch the content of the full URL and store the response
  async fetchContent() {
    const url = this.getFullUrl();
    console.log(`Fetching content from: ${url}`); // Debugging log
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this._response = await response.json();
      console.log('Fetched response:', this._response); // Debugging log
      return this._response;
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  }
}

class StorageObject {
  #accu;

  constructor(initialArray) {
    this.#accu = Array.isArray(initialArray) ? initialArray : [];
  }

  // Getter for accu
  get accu() {
    return this.#accu;
  }

  // Setter for accu
  set accu(newArray) {
    if (Array.isArray(newArray)) {
      this.#accu = newArray;
    } else {
      throw new Error('Value must be an array.');
    }
  }

  // Method to accumulate a new value
  accumulateValue(additionalValue) {
    this.#accu.push(additionalValue);
  }
}

class StoreUI {
  constructor(id = 'storeUI', storageObject = new StorageObject([])) {
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
    this.storeButton = document.createElement('button');
    this.storeButton.id = 'storeUIButton';
    this.storeButton.textContent = 'Store Me'; // Change button label to "Store Me"
    this.div.appendChild(this.storeButton);

    // Create a second button element
    this.listButton = document.createElement('button');
    this.listButton.id = 'storeUIListButton';
    this.listButton.textContent = 'Show All'; // Change button label to "Show All"
    this.div.appendChild(this.listButton);

    // Create a third button element
    this.resetButton = document.createElement('button');
    this.resetButton.id = 'storeUIResetButton';
    this.resetButton.textContent = 'Reset'; // Add Reset button
    this.div.appendChild(this.resetButton);

    // Create an output div element
    this.outputDiv = document.createElement('div');
    this.outputDiv.id = 'storeUIOutput';
    this.div.appendChild(this.outputDiv);

    // Add event listeners to the buttons with bind
    this.storeButton.addEventListener('click', this.handleStoreButtonClick.bind(this));
    this.listButton.addEventListener('click', this.handleListButtonClick.bind(this));
    this.resetButton.addEventListener('click', this.handleResetButtonClick.bind(this));

    // Load any saved array from localStorage on initialization
    const savedArray = localStorage.getItem('storageArray');
    if (savedArray) {
      this.storageObject.accu = JSON.parse(savedArray);
    }
    if (!this.storageObject.accu || this.storageObject.accu.length === 0) {
      this.storageObject.accu = ['gen1:1'];
      localStorage.setItem('storageArray', JSON.stringify(this.storageObject.accu));
    }
    this.updateOutputDiv();
  }

  // Method to handle Store button click
  async handleStoreButtonClick() {
    const inputValue = this.inputField.value;
    if (inputValue) {
      this.storageObject.accumulateValue(inputValue);
      localStorage.setItem('storageArray', JSON.stringify(this.storageObject.accu)); // Save array to localStorage
      
      // Create a new BibRef instance
      const bibRef = new BibRef(inputValue);
      
      // Fetch content and update output div content
      await bibRef.fetchContent();
      this.updateOutputDivWithBibRef(bibRef);
      
      this.inputField.value = ''; // Clear the input field
    } else {
      this.outputDiv.textContent = 'Please enter something!';
    }
  }

  // Method to handle list button click
  async handleListButtonClick() {
    const ulElement = document.createElement('ul');
    for (const ref of this.storageObject.accu) {
      const bibRef = new BibRef(ref);
      await bibRef.fetchContent();
      const liElement = document.createElement('li');
      if (bibRef.response && bibRef.response.content) {
        const pElement = document.createElement('p');
        pElement.innerHTML = `<strong>${bibRef.reference}:</strong> ${bibRef.response.content}`;
        liElement.appendChild(pElement);
      } else {
        liElement.innerHTML = `<strong>${bibRef.reference}:</strong> No content available.`;
      }
      ulElement.appendChild(liElement);
    }
    this.outputDiv.innerHTML = ''; // Clear previous content
    this.outputDiv.appendChild(ulElement); // Add list content
  }

  // Method to handle Reset button click
  handleResetButtonClick() {
    this.storageObject.accu = ['gen1:1'];
    localStorage.setItem('storageArray', JSON.stringify(this.storageObject.accu)); // Save reset array to localStorage
    this.updateOutputDiv();
  }

  // Method to update the output div with stored values
  async updateOutputDiv() {
    const lastValue = this.storageObject.accu[this.storageObject.accu.length - 1];
    if (lastValue) {
      const bibRef = new BibRef(lastValue);
      await bibRef.fetchContent();
      this.updateOutputDivWithBibRef(bibRef);
    } else {
      this.outputDiv.textContent = 'No stored values.';
    }
  }

  // Method to update the output div with BibRef content
  updateOutputDivWithBibRef(bibRef) {
    if (bibRef.response && bibRef.response.content) {
      const pElement = document.createElement('p');
      pElement.innerHTML = `<strong>${bibRef.reference}:</strong> ${bibRef.response.content}`;
      this.outputDiv.innerHTML = ''; // Clear previous content
      this.outputDiv.appendChild(pElement); // Add new content
    } else {
      this.outputDiv.innerHTML = `<strong>${bibRef.reference}:</strong> No content available.`;
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
const storage = new StorageObject(['gen1:1']);
const myStoreUI = new StoreUI('myDivId', storage);
console.log(myStoreUI.getDiv());  // Outputs: <div id="myDivId">...</div>



/*
class BibRef {
  constructor(ref = 'gen1:1') {
    this.ref = ref;
    this.urlbase = 'https://jsfapi.netlify.app/.netlify/functions/bgw';
    this._response = null; // Initialize the response property to null
  }

  // Getter for ref
  get reference() {
    return this.ref;
  }

  // Setter for ref
  set reference(newRef) {
    this.ref = newRef;
  }

  // Getter for response
  get response() {
    return this._response;
  }

  // Method to get the full URL with ?param=$ref
  getFullUrl() {
    return `${this.urlbase}?param=${this.ref}`;
  }

  // Method to fetch the content of the full URL and store the response
  async fetchContent() {
    const url = this.getFullUrl();
    console.log(`Fetching content from: ${url}`); // Debugging log
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this._response = await response.json();
      console.log('Fetched response:', this._response); // Debugging log
      return this._response;
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  }
}

class StorageObject {
  #accu;

  constructor(initialArray) {
    this.#accu = Array.isArray(initialArray) ? initialArray : [];
  }

  // Getter for accu
  get accu() {
    return this.#accu;
  }

  // Setter for accu
  set accu(newArray) {
    if (Array.isArray(newArray)) {
      this.#accu = newArray;
    } else {
      throw new Error('Value must be an array.');
    }
  }

  // Method to accumulate a new value
  accumulateValue(additionalValue) {
    this.#accu.push(additionalValue);
  }
}

class StoreUI {
  constructor(id = 'storeUI', storageObject = new StorageObject([])) {
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
    this.button.textContent = 'Store Me'; // Change button label to "Store Me"
    this.div.appendChild(this.button);

    // Create a second button element
    this.listButton = document.createElement('button');
    this.listButton.id = 'storeUIListButton';
    this.listButton.textContent = 'Show All'; // Change button label to "Show All"
    this.div.appendChild(this.listButton);

    // Create an output div element
    this.outputDiv = document.createElement('div');
    this.outputDiv.id = 'storeUIOutput';
    this.div.appendChild(this.outputDiv);

    // Add event listeners to the buttons with bind
    this.button.addEventListener('click', this.handleButtonClick.bind(this));
    this.listButton.addEventListener('click', this.handleListButtonClick.bind(this));

    // Load any saved array from localStorage on initialization
    const savedArray = localStorage.getItem('storageArray');
    if (savedArray) {
      this.storageObject.accu = JSON.parse(savedArray);
    }
    if (!this.storageObject.accu || this.storageObject.accu.length === 0) {
      this.storageObject.accu = ['gen1:1'];
      localStorage.setItem('storageArray', JSON.stringify(this.storageObject.accu));
    }
    this.updateOutputDiv();
  }

  // Method to handle button click
  async handleButtonClick() {
    const inputValue = this.inputField.value;
    if (inputValue) {
      this.storageObject.accumulateValue(inputValue);
      localStorage.setItem('storageArray', JSON.stringify(this.storageObject.accu)); // Save array to localStorage
      
      // Create a new BibRef instance
      const bibRef = new BibRef(inputValue);
      
      // Fetch content and update output div content
      await bibRef.fetchContent();
      this.updateOutputDivWithBibRef(bibRef);
      
      this.inputField.value = ''; // Clear the input field
    } else {
      this.outputDiv.textContent = 'Please enter something!';
    }
  }

  // Method to handle list button click
  async handleListButtonClick() {
    const ulElement = document.createElement('ul');
    for (const ref of this.storageObject.accu) {
      const bibRef = new BibRef(ref);
      await bibRef.fetchContent();
      const liElement = document.createElement('li');
      if (bibRef.response && bibRef.response.content) {
        const pElement = document.createElement('p');
        pElement.innerHTML = `<strong>${bibRef.reference}:</strong> ${bibRef.response.content}`;
        liElement.appendChild(pElement);
      } else {
        liElement.innerHTML = `<strong>${bibRef.reference}:</strong> No content available.`;
      }
      ulElement.appendChild(liElement);
    }
    this.outputDiv.innerHTML = ''; // Clear previous content
    this.outputDiv.appendChild(ulElement); // Add list content
  }

  // Method to update the output div with stored values
  async updateOutputDiv() {
    const lastValue = this.storageObject.accu[this.storageObject.accu.length - 1];
    if (lastValue) {
      const bibRef = new BibRef(lastValue);
      await bibRef.fetchContent();
      this.updateOutputDivWithBibRef(bibRef);
    } else {
      this.outputDiv.textContent = 'No stored values.';
    }
  }

  // Method to update the output div with BibRef content
  updateOutputDivWithBibRef(bibRef) {
    if (bibRef.response && bibRef.response.content) {
      const pElement = document.createElement('p');
      pElement.innerHTML = `<strong>${bibRef.reference}:</strong> ${bibRef.response.content}`;
      this.outputDiv.innerHTML = ''; // Clear previous content
      this.outputDiv.appendChild(pElement); // Add new content
    } else {
      this.outputDiv.innerHTML = `<strong>${bibRef.reference}:</strong> No content available.`;
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
const storage = new StorageObject(['gen1:1']);
const myStoreUI = new StoreUI('myDivId', storage);
console.log(myStoreUI.getDiv());  // Outputs: <div id="myDivId">...</div>

*/


/*
class BibRef {
  constructor(ref = 'gen1:1') {
    this.ref = ref;
    this.urlbase = 'https://jsfapi.netlify.app/.netlify/functions/bgw';
    this._response = null; // Initialize the response property to null
  }

  // Getter for ref
  get reference() {
    return this.ref;
  }

  // Setter for ref
  set reference(newRef) {
    this.ref = newRef;
  }

  // Getter for response
  get response() {
    return this._response;
  }

  // Method to get the full URL with ?param=$ref
  getFullUrl() {
    return `${this.urlbase}?param=${this.ref}`;
  }

  // Method to fetch the content of the full URL and store the response
  async fetchContent() {
    const url = this.getFullUrl();
    console.log(`Fetching content from: ${url}`); // Debugging log
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this._response = await response.json();
      console.log('Fetched response:', this._response); // Debugging log
      return this._response;
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  }
}

class StorageObject {
  #accu;

  constructor(initialArray) {
    this.#accu = Array.isArray(initialArray) ? initialArray : [];
  }

  // Getter for accu
  get accu() {
    return this.#accu;
  }

  // Setter for accu
  set accu(newArray) {
    if (Array.isArray(newArray)) {
      this.#accu = newArray;
    } else {
      throw new Error('Value must be an array.');
    }
  }

  // Method to accumulate a new value
  accumulateValue(additionalValue) {
    this.#accu.push(additionalValue);
  }
}

class StoreUI {
  constructor(id = 'storeUI', storageObject = new StorageObject([])) {
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
    this.button.textContent = 'Store Me'; // Change button label to "Store Me"
    this.div.appendChild(this.button);

    // Create a second button element
    this.listButton = document.createElement('button');
    this.listButton.id = 'storeUIListButton';
    this.listButton.textContent = 'Show All'; // Change button label to "Show All"
    this.div.appendChild(this.listButton);

    // Create an output div element
    this.outputDiv = document.createElement('div');
    this.outputDiv.id = 'storeUIOutput';
    this.div.appendChild(this.outputDiv);

    // Add event listeners to the buttons with bind
    this.button.addEventListener('click', this.handleButtonClick.bind(this));
    this.listButton.addEventListener('click', this.handleListButtonClick.bind(this));

    // Load any saved array from localStorage on initialization
    const savedArray = localStorage.getItem('storageArray');
    if (savedArray) {
      this.storageObject.accu = JSON.parse(savedArray);
    }
    if (!this.storageObject.accu || this.storageObject.accu.length === 0) {
      this.storageObject.accu = ['gen1:1'];
      localStorage.setItem('storageArray', JSON.stringify(this.storageObject.accu));
    }
    this.updateOutputDiv();
  }

  // Method to handle button click
  async handleButtonClick() {
    const inputValue = this.inputField.value;
    if (inputValue) {
      this.storageObject.accumulateValue(inputValue);
      localStorage.setItem('storageArray', JSON.stringify(this.storageObject.accu)); // Save array to localStorage
      
      // Create a new BibRef instance
      const bibRef = new BibRef(inputValue);
      
      // Fetch content and update output div content
      await bibRef.fetchContent();
      this.updateOutputDivWithBibRef(bibRef);
      
      this.inputField.value = ''; // Clear the input field
    } else {
      this.outputDiv.textContent = 'Please enter something!';
    }
  }

  // Method to handle list button click
  async handleListButtonClick() {
    const ulElement = document.createElement('ul');
    for (const ref of this.storageObject.accu) {
      const bibRef = new BibRef(ref);
      await bibRef.fetchContent();
      const liElement = document.createElement('li');
      if (bibRef.response && bibRef.response.content) {
        const pElement = document.createElement('p');
        pElement.innerHTML = bibRef.response.content;
        liElement.appendChild(pElement);
      } else {
        liElement.textContent = 'No content available.';
      }
      ulElement.appendChild(liElement);
    }
    this.outputDiv.innerHTML = ''; // Clear previous content
    this.outputDiv.appendChild(ulElement); // Add list content
  }

  // Method to update the output div with stored values
  async updateOutputDiv() {
    const lastValue = this.storageObject.accu[this.storageObject.accu.length - 1];
    if (lastValue) {
      const bibRef = new BibRef(lastValue);
      await bibRef.fetchContent();
      this.updateOutputDivWithBibRef(bibRef);
    } else {
      this.outputDiv.textContent = 'No stored values.';
    }
  }

  // Method to update the output div with BibRef content
  updateOutputDivWithBibRef(bibRef) {
    if (bibRef.response && bibRef.response.content) {
      const pElement = document.createElement('p');
      pElement.innerHTML = bibRef.response.content;
      this.outputDiv.innerHTML = ''; // Clear previous content
      this.outputDiv.appendChild(pElement); // Add new content
    } else {
      this.outputDiv.textContent = 'No content available.';
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
const storage = new StorageObject(['gen1:1']);
const myStoreUI = new StoreUI('myDivId', storage);
console.log(myStoreUI.getDiv());  // Outputs: <div id="myDivId">...</div>


*/