class BibRef {
  constructor(ref = 'gen1:1-4') {
    this.ref = ref;
    this.urlbase = 'https://jsfapi.netlify.app/.netlify/functions/bgw';
    this._response_object = null; // Initialize the response property to null
    
    // Fetch content and create the paragraph inside the constructor
    this.fetchContent().then(() => {
      this.createContentHTML();
    });
  }

// =============================================================================
// about the REF

  // Getter for ref
  get reference() {
    return this.ref;
  }

  // Setter for ref
  set reference(newRef) {
    this.ref = newRef;
  }

  // Method to display the reference
  displayReference() {
    console.log(`The current reference is: ${this.ref}`);
  }

// =============================================================================
// about the FETCH of URL

  // Method to get the full URL with ?param=$ref
  getFullUrl() {
    return `${this.urlbase}?param=${this.ref}`;
  }s

  // Method to fetch the content of the full URL and store the response
  async fetchContent() {
    const url = this.getFullUrl();
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this._response_object = await response.json(); // parse json into object
      return this._response_object;
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  }
  
// =============================================================================
// about the RESPONSE, PAYLOAD

  // Getter for response
  get response() {
    return this._response_object;
  }
  
  // Method to get the stored response (now using the getter)
  getResponse() {
    return this.response;
  }

 // Getter for response.content  property
  get content() {
    return this._response_object.content;
  }
  
// =============================================================================
// about the OUTPUT FORMATTING

    // Method to create a <p> element containing the response.content
  createContentHTML() {
    if (this._response_object &&this._response_object.content) {
      const pElement = document.createElement('p');
      pElement.innerHTML = this._response_object.content;
//      console.log('Created <p> element:', pElement); // Debugging log
      document.body.appendChild(pElement);  // Append the <p> element to the body
    } else {
      console.error('No content available in the response');
    }
  }

}

// Usage

// Usage
const myBibRef = new BibRef();
myBibRef.displayReference();  // Outputs: The current reference is: gen1:1
console.log(myBibRef.getFullUrl());  // Outputs: https://jsfapi.netlify.app/.netlify/functions/bgw?param=gen1:1
