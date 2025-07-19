import React, { useState } from 'react';
import LangList from './LangList';
import copy_icon from '../../assets/copy_icon.gif';
import download_icon from '../../assets/download_logo.png';
import { toast } from 'react-hot-toast';

function Python() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    const toastId = toast.loading('Executing Python Code...');

    const payload = {
      language: "py",
      code,
    };

    try {
      const response = await fetch("http://localhost:5000/runpy", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      toast.dismiss(toastId);

      if (response.ok) {
        setOutput(data.output || "No output returned.");
        toast.success("Executed Successfully.");
      } else {
        setOutput(data.error || "Execution failed.");
        toast.error("Execution Failed.");
      }
    } catch (err) {
      toast.dismiss(toastId);
      setOutput("Error communicating with server.");
      toast.error("Server error.");
      console.error("Execution error:", err);
    }
  };

  const clear = () => {
    setOutput('');
    toast.success('Output cleared.');
  };

  const copyContent = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied.");
  };

  const codeToFile = () => {
    const blob = new Blob([code], { type: "text/x-python" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "codofile-python.py";
    link.click();
    toast.success('File downloaded.');
  };

  return (
    <div className="voiceContainer">
      <div className="voiceBody wholeeditorBody">
        <div className="leftLang">
          <LangList leftcolorpy="white" />
        </div>
        <div className="PlaygroundMain">
          <div className='runHeaderJS'>
            <div className='jsleftheaderfile jsfile'>
              <mark><h2>index.py</h2></mark>
              <div className='runbtn'>
                <button className='vbtn'><img className='voicebtn' onClick={copyContent} src={copy_icon} alt='copy' /></button>
                <button className='vbtn'><img className='voicebtn' onClick={codeToFile} src={download_icon} alt='download' /></button>
                <button className='btn' onClick={handleSubmit}>RUN</button>
              </div>
            </div>
            <div className='jsrightheaderfile jsfile'>
              <mark><p>OUTPUT</p></mark>
              <button className='clear' onClick={clear}>Clear</button>
            </div>
          </div>
          <div className='jsplayground playground'>
            <div className='leftplayground snippet'>
              <textarea className='dartpython' id="python" value={code} onChange={(e) => setCode(e.target.value)} placeholder='print("Hello Codoplayers")'></textarea>
            </div>
            <h1 className="invisible"><mark>Output</mark></h1>
            <div className='rightplayground snippet' id='consoleOutput'>
              <p>{output}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Python;
