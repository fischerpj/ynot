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
					/*
					onChange: async () => {
						const data = await editor.save();
						localStorage.setItem('editorData', JSON.stringify(data));
					},
					*/
            });
      })