console.log("hello");

document.addEventListener("DOMContentLoaded", () => {
  const editor = new EditorJS({
    holder: 'editorjs',
    tools: {
      header: {
        class: Header,
        inlineToolbar: true
      },
      list: {
        class: EditorjsList,
        inlineToolbar: true
      }
    },
		onChange: async () => {
		  const data = await editor.save();
			localStorage.setItem('editorData', JSON.stringify(data));
			},
  });
            
  // Save content to Local Storage
  document.getElementById('saveButton').addEventListener('click', () => {
    editor.save().then((outputData) => {
      localStorage.setItem('editorData', JSON.stringify(outputData));
      alert("Content saved successfully!");
    }).catch((error) => {
      console.error("Saving failed:", error);
    });
});

// Load content from Local Storage
  document.getElementById('loadButton').addEventListener('click', () => {
    const savedData = localStorage.getItem('editorData');
    if (savedData) {
      editor.render(JSON.parse(savedData));
      alert("Content loaded successfully!");
    } else {
      alert("No saved content found.");
    }
  });        
      
})