class monUI {
    constructor(ref = 'gen1:1') {
        this.ref = ref;
        this.urlbase = 'https://jsfapi.netlify.app/.netlify/functions/bgw';
        // Build the urlfull using the urlbase and ref argument
        this.urlfull = this.getFullUrl();
        
        this.divId = 'mainDiv';
        this.div = this.createDivIfNeeded();

        this.addInputAndButton();
        this.fetchAndUpdateDOM(this.ref);
}
    
  // Method to get the full URL with ?param=$ref
  getFullUrl() {
    return `${this.urlbase}?param=${this.ref}`;
  }

    createDivIfNeeded() {
        let div = document.getElementById(this.divId);
        if (!div) {
            div = document.createElement('div');
            div.id = this.divId;
            document.body.appendChild(div);
        }
        return div;
    }

    addInputAndButton() {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter ref';
        input.id = 'inputField';
        
        const button = document.createElement('button');
        button.innerText = 'View';
        button.onclick = this.fetchAndUpdateDOM.bind(this, input.value);

        const outputDiv = document.createElement('div');
        outputDiv.id = 'outputDiv';

        this.div.appendChild(input);
        this.div.appendChild(button);
        this.div.appendChild(outputDiv);
    }

    async fetchAndUpdateDOM(ref) {
        const url = this.getFullUrl(ref);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.updateDiv(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            this.updateDiv({ error: 'Error fetching data' });
        }
    }

    updateDiv(data) {
        const outputDiv = document.getElementById('outputDiv');
        outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }
}

// Example usage:
const uiInstance = new monUI(); // Uses default ref value 'gen1:1'
