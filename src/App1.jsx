import React, { useState, useEffect } from "react";
import importdata from "./Student_Data.json";
import Card from "./Card.jsx";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  let newData = [...importdata];
  newData = newData.map((i) => {
    return { ...i, id: uuidv4() };
  });

  //saved here all the favs
  const [favList, setFavList] = useState([]);
  const [data, setData] = useState([]); //single source of truth

  const [recentlyDeleted, setRecentlyDeleted] = useState([]);

  const [uniName, setUniName] = useState(" ");
  const [special, setSpecial] = useState(" ");
  const [grad, setGrad] = useState(" ");
  const [emp, setEmp] = useState(" ");
  const [jobTit, setJobTit] = useState(" ");
  const [jobStartDat, setJobStartDat] = useState(" ");
  const [career, setCareer] = useState(" ");

  //console.log(recentlyDeleted, "recent");
  //console.log(setRecentlyDeleted, "setrecent");

  //ComponentDidMount-- Runs only after component has mounted
  useEffect(() => {
    let newData = [...importdata];
    newData = newData.map((i) => {
      return { ...i, id: uuidv4() };
    });
    setData(newData);
  }, []);

  function handelFav(employer) {
    let list = [...favList];
    if (!list.includes(employer)) {
      list.push(employer);
      setFavList(list);
      // console.log(favList);
      // setFavList(list.map((item)=> <li key={uuidv4()}>{item}</li>))
    }
  }

  function handelUnFav(employer) {
    let list = [...favList];
    if (list.includes(employer)) {
      list.splice(list.indexOf(employer), 1);
      // console.log(list);
      setFavList(list);
      // console.log(favList);
      // setFavList(list.map((item)=> <li key={uuidv4()}>{item}</li>))
    }
  }

  //Disable Handler
  function favDisableHandler(employer) {
    if (favList.includes(employer)) {
      return true;
    }
  }

  function unFavDisableHandler(employer) {
    if (!favList.includes(employer)) {
      return true;
    }
  }

  function handleDelete(id) {
    const filtered = data.filter((i) => i.id !== id);
    const del = data.filter((i) => i.id === id);
    setRecentlyDeleted(recentlyDeleted.concat(del));
    setData(filtered);
  }

  function handleSubmit() {
    //e.preventDefault();
    //e.stopPropagation();

    const objToPush = {
      University_Name: uniName,
      Specialization: special,
      Graduation_Year: grad,
      Employer: emp,
      Job_Title: jobTit,
      Job_Start_Date: jobStartDat,
      Career_Url: career,
    };

    const pushed = [objToPush, ...data];
    console.log(pushed, "pusheddata");
    setData(pushed);
  }

  // Map returns all the elements as an 'li' element
  const employerList = data.map((obj) => (
    <div className="contain" key={obj.id}>
      <Card
        employer={obj.Employer}
        jobTitle={obj.Job_Title}
        universityName={obj.University_Name}
        uuid={obj.id}
      />
      <br />
      <button
        disabled={favDisableHandler(obj.Employer)}
        onClick={() => handelFav(obj.Employer)}
      >
        Favorite
      </button>
      <button
        disabled={unFavDisableHandler(obj.Employer)}
        onClick={() => handelUnFav(obj.Employer)}
      >
        Un-Favorite
      </button>
      <button onClick={() => handleDelete(obj.id)}>Delete</button>
    </div>
  ));

  return (
    <div className="App">
      <div className="del">
        Recently Deleted Items are:
        {recentlyDeleted.map((i) => i.Employer).join(" , ")}
      </div>
      <div className="favorite">
        {`Your Favorite employers are:${favList.join(" , ")}`}
      </div>

      <div className="entrynam">
        <label>University_Name</label>
        <input type="text" onChange={(e) => setUniName(e.target.value)}></input>

        <label>Specialization</label>
        <input type="text" onChange={(e) => setSpecial(e.target.value)}></input>
        <br />
        <label>Graduation_Year</label>
        <input type="text" onChange={(e) => setGrad(e.target.value)}></input>

        <label>Employer</label>
        <input type="text" onChange={(e) => setEmp(e.target.value)}></input>
        <br />
        <label>Job_Title</label>
        <input type="text" onChange={(e) => setJobTit(e.target.value)}></input>

        <label>Job_Start_Date</label>
        <input
          type="text"
          onChange={(e) => setJobStartDat(e.target.value)}
        ></input>
        <br />
        <label>Career_Url</label>
        <input type="text" onChange={(e) => setCareer(e.target.value)}></input>
        <br />
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>

      <ul className="employerName">{employerList}</ul>
    </div>
  );
}

export default App;
