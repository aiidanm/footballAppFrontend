import React, { useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { submitAiReq } from "../../ApiFuncs";
import { getAuth } from "firebase/auth";

const BulkEntry = ({}) => {
  const auth = getAuth();
  const user = auth.currentUser;


 

  return (
    <div className="pageContainer">
      <Link to="/" className="HomeLink">
        <h1 className="TitleHeader">MNF</h1>
      </Link>
      <h2>Bulk data entry</h2>
      <h4>upload</h4>
    <input className="bulkfileUpload" type="file" />
      <button className="bulkfileSubmit">Submit file</button>
    </div>
  );
};

export default BulkEntry;
