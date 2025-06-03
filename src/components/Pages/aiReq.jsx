import React, { useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { submitAiReq } from "../../ApiFuncs";

const AiReq = ({}) => {
  const [aiInput, setaiInput] = useState("");
  const [aiResult, setAiResult] = useState();

  const handleChange = (e) => {
    setaiInput(e.target.value);
  };

  const handleSubmit = (e) => {
    submitAiReq(aiInputm, token).then((res) => setAiResult(res));
  };

  return (
    <div className="pageContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">MNF</h1>
      </Link>
      <h2>Ai chatbot</h2>
      <h4>Page in testing</h4>

      <input className="aiInput" onChange={handleChange}></input>
      <button className="aiSubmit" onClick={() => handleSubmit}>
        Submit request
      </button>

      {aiResult ? <p>{aiResult}</p> : null}
    </div>
  );
};

export default AiReq;
