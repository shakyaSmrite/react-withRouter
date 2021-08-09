import React, { useState, useEffect } from "react";
import importdata from "./Student_Data.json";
import Card from "./Card.jsx";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import NewFile from "./NewFile.jsx";
import SpaceXList from "./SpaceXList.jsx";

function TablePage() {
  //saved here all the favs
  const [favList, setFavList] = useState([]);
  const [data, setData] = useState([]); //single source of truth
  const [posts, setPosts] = useState([]);
  const [space, setSpace] = useState([]);

  const [recentlyDeleted, setRecentlyDeleted] = useState([]);
  const [uniName, setUniName] = useState(" ");
  const [special, setSpecial] = useState(" ");
  const [grad, setGrad] = useState(" ");
  const [emp, setEmp] = useState(" ");
  const [jobTit, setJobTit] = useState(" ");
  const [jobStartDat, setJobStartDat] = useState(" ");
  const [career, setCareer] = useState(" ");
  const [Specialization, setSpecialization] = useState(" ");

  const [isLoading, setIsLoading] = useState(true);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [isSpaceLoading, setIsSpaceLoading] = useState(true);

  //console.log(recentlyDeleted, "recent");
  //console.log(setRecentlyDeleted, "setrecent");

  console.log(posts, "post");

  //ComponentDidMount-- Runs only after component has mounted
  // useEffect(() => {
  //   let newData = [...importdata];
  //   newData = newData.map((i) => {
  //     return { ...i, id: uuidv4() };
  //   });
  //   setData(newData);
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/users/getAllEntry")
  //     .then((res) => console.log(res))
  //     .catch((e) => console.log(e));
  // }, []);

  //Asynchronous
  //backend AXIOS
  useEffect(() => {
    axios
      .get("http://localhost:4000/users/getAllEntry")
      .then((resp) => {
        setIsLoading(false);
        setData(resp.data);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getposts")
      .then((resp) => {
        setPosts(resp.data);
        setIsPostsLoading(false);
        console.log(resp, "resp");
      })
      .catch((e) => {
        setIsPostsLoading(false);
      });
  }, []);

  const postsList = posts.map((x) => {
    return (
      <div className="container" key={x.id}>
        <NewFile title={x.title} />
      </div>
    );
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/getSpaceX")
      .then((resp) => {
        setSpace(resp.data);
        setIsSpaceLoading(false);
        console.log(resp, "resp");
      })
      .catch((e) => {
        setIsSpaceLoading(false);
      });
  }, []);

  const spaceList = space.map((x) => {
    return (
      <div className="spacecontain" key={x.id}>
        <SpaceXList title={x.title} />
      </div>
    );
  });

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

  if (isLoading || isPostsLoading || isSpaceLoading) {
    return (
      <>
        <LinearProgress color="secondary" />
      </>
    );
  }

  return (
    <div className="Home">
      <section className="del">
        Recently Deleted Items are:
        {recentlyDeleted.map((i) => i.Employer).join(" , ")}
      </section>

      <section className="favorite">
        {`Your Favorite employers are:${favList.join(" , ")}`}
      </section>

      <form className="input">
        <input
          type="text"
          onChange={(e) => setUniName(e.target.value)}
          placeholder="University_Name"
        />

        <input
          type="text"
          onChange={(e) => setSpecial(e.target.value)}
          placeholder="Specialization"
        />

        <input
          type="text"
          onChange={(e) => setGrad(e.target.value)}
          placeholder="Graduation_Year"
        />

        <input
          type="text"
          onChange={(e) => setEmp(e.target.value)}
          placeholder="Employer"
        />

        <input
          type="text"
          onChange={(e) => setJobTit(e.target.value)}
          placeholder="Job_Ttile"
        />

        <input
          type="text"
          onChange={(e) => setJobStartDat(e.target.value)}
          placeholder="Job_Start_Date"
        />

        <input
          type="text"
          onChange={(e) => setCareer(e.target.value)}
          placeholder="Career_Url"
        />
        <button onClick={() => handleSubmit()}>Submit</button>
      </form>

      <div class="bodysection">
        <div className="bodysection1 col1">
          <ul className="employerName">{employerList}</ul>
        </div>

        <div className="bodysection1 col2">
          <ul className="jsonList">{postsList} </ul>
          <div className="spacesection">
            <ul className="spaceXlist">{spaceList}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TablePage;
