// Ref class and methods

class Ref {
  // takes an array of validated reference(s) as argument
  constructor(input = [ 'Hos14!SG21', 'Neh13!SG21','Rev22:4!KJV' ]) {
    this.inputs = Array.isArray(input) ? input : [input];
    this.baseUrl = 'https://hall.pjafischer.workers.dev/passage/';
  }

  async fetch_parallel() {
    const fetchPromises = this.inputs.map(input => {
      const url = `${this.baseUrl}?param=${encodeURIComponent(input)}`;
      return fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error for ${input}! status: ${response.status}`);
          }
          return response.json();
        })
        .catch(error => {
          console.error(`Fetch error for ${input}:`, error);
          return null;
        });
    });

    return Promise.all(fetchPromises);
  }
}

// Assuming the Ref class has already been defined


// Test with a single reference
testSingleRef = async () => {
  const ref = new Ref('gen1:1');
  const [result] = await ref.fetch_parallel();
  console.log('Single Reference Result:\n', result);
};

// Test with multiple references
const testMultipleRefs = async () => {
  const ref = new Ref();
  const results = await ref.fetch_parallel();
  results.forEach((text, index) => {
    console.log(`\nPassage ${index + 1}:\n`, text);
  });
};

// Run both tests
(async () => {
  console.log('=== Testing Single Reference ===');
  await testSingleRef();
  console.log('\n=== Testing Multiple References ===');
  await testMultipleRefs();
})();
