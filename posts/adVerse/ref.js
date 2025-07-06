// Ref class and methods can be imported in quarto ojs

export class Greeter {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, ${this.name}!`;
  }
}

export class Ref {
  // takes an array of validated reference(s) as argument
  // Step 1: Define URLs-params as a property
  constructor(input = [ 'Hos14!SG21', 'Neh13!SG21','Rev22:4!KJV' ]) {
    this.inputs = Array.isArray(input) ? input : [input];
    this.baseUrl = 'https://hall.pjafischer.workers.dev/passage/';
    this.urls = this.inputs.map(input => {
      const url = `${this.baseUrl}?param=${encodeURIComponent(input)}`;
      return url
    });
    this.data = [];
    this.outputDiv = document.getElementById('outputDiv');
  }
  
  // Step 2: Method to fetch and populate data
  async fetch_parallel() {
    try {
      const responses = await Promise.all(
        this.urls.map(url => fetch(url).then(res => res.json()))
        )
      this.data = responses;
      // Test Output Clear previous content
    } catch (error) {
      console.error('Fetch Parallel failed:', error);
    }
  }
  
   // Step 3: Display method that ensures data is ready
  displayData() {
    const outputDiv = document.getElementById('outputDiv');
    if (!outputDiv) {
      console.error('No element with id="outputdiv" found.');
      return;
    }

    // Clear previous content
    outputDiv.innerHTML = '';

    // Create UL
    const ul = document.createElement('ul');

    // Create LI for each data item
    this.data.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = item.htmlraw; // or any other property
      ul.appendChild(li);
    });

    // Append UL to outputDiv
    outputDiv.appendChild(ul);
  } // end of Display
  
}

