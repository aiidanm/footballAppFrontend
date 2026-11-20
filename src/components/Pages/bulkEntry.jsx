import React, { useState } from "react";
import "../../App.css";
import { submitAiReq } from "../../ApiFuncs";
import { getAuth } from "firebase/auth";
import Header from "./header";

const BulkEntry = ({}) => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <div className="pageContainer">
      <Header />
      <h2>Bulk data entry</h2>
      <h4>upload</h4>
      <input className="bulkfileUpload" type="file" />
      <button className="bulkfileSubmit">Submit file</button>
    </div>
  );
};

export default BulkEntry;
