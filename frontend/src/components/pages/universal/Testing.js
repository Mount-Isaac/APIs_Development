import React, { useState } from 'react';

const TextAreaWithObject = () => {
  const initialObject = {
    firstname: "",
    lastname: "",
    email: "",
    phone: ""
  };

  const [inputValue, setInputValue] = useState(JSON.stringify(initialObject, null, 2));

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(JSON.parse(inputValue))
  }

  const handleBlur = () => {
    try {
      const parsedObject = JSON.parse(inputValue);
      setInputValue(JSON.stringify(parsedObject, null, 2));
    } catch (error) {
      alert("Invalid JSON. Please correct it.");
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <textarea 
                value={inputValue} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                rows="10" 
                cols="30"
            />
            <input type='submit'/>

        </form>
    </div>
  );
};

export default TextAreaWithObject;
