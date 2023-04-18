import React, { useState } from 'react';

function PdfView() {
  const pdfjs = require('pdfjs-dist');
  const [text, setText] = useState([]);

  const handleFileChange = async (event) => {
    const textArr = [];
    const file = event.target.files[0];
    console.log(file);
    if (!file) {
      console.error('No file selected');
      return;
    }
    if (file.type !== 'application/pdf') {
      console.error('Selected file is not a PDF');
      return;
    }
    try {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
      const loadingTask = pdfjs.getDocument(URL.createObjectURL(file));
      console.log(loadingTask);
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      for(let i = 1; i <= numPages; i++){
        const page = await pdf.getPage(i); 
        const textContent = await page.getTextContent();
        const extractedText = textContent.items.map((item) => item.str).join(' ');
        textArr.push(extractedText);
      }
      setText(textArr);
    } catch (error) {
      console.error(error);
    }
  };
  
  const copyAllText = () => {
    const textToCopy = text.join('\n');
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error);
      });
  };

  return (
    <div>
      <input className='btn' type="file" onChange={handleFileChange} />
      <br/>
      <br/>
      <br/>
      <br/>
      {text.length > 0 && (
        <button className='btn' onClick={copyAllText}>Copy All</button>
      )}
      {text.map((text, id) => (
        <p className='text' key={id}>{text}</p>
      ))}
    </div>
  );
}

export default PdfView;
