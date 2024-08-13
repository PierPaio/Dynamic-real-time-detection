import React, { useState } from "react";

const FileUpload = ({ onFileUpload }) => {
    const[file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                onFileUpload(text);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload} className="btn btn-success">Upload CSV</button>
        </div>
    )
};

export default FileUpload;