import React from "react";

const NewEntry = (
  setUniName,
  setSpecial,
  setGrad,
  setEmp,
  setJobTit,
  setJobStartDat,
  setCareer
) => {
  return (
    <form>
      <label>University_Name</label>
      <input onChange={(e) => setUniName(e.target.value)} />

      <label>Specialization</label>
      <input onChange={(e) => setSpecial(e.target.value)} />

      <label>Graduation_Year</label>
      <input onChange={(e) => setGrad(e.target.value)} />

      <label>Employer</label>
      <input onChange={(e) => setEmp(e.target.value)} />

      <label>Job_Title</label>
      <input onChange={(e) => setJobTit(e.target.value)} />

      <label>Job_Start_Date</label>
      <input onChange={(e) => setJobStartDat(e.target.value)} />

      <label>Career_Url</label>
      <input onChange={(e) => setCareer(e.target.value)} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default NewEntry;
