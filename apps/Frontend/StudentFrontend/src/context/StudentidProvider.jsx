import React, { createContext, useState } from "react";

export const studentidContext = createContext();

function StudentidProvider(props) {
  const [studentId, setStudentId] = useState(null);
  const [Studentdata, setStudentdata] = useState({});
  return (
    <studentidContext.Provider value={{ studentId, setStudentId  , Studentdata , setStudentdata}}>
      {props.children}
    </studentidContext.Provider>
  );
}

export default StudentidProvider;
