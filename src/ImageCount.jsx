import React from "react";
import { useState } from "react";

const ImageCount = () => {
  // console.log(props, 'PROPS');
  // const [shouldDisplayName, setShouldDisplayName] = useState(true);
  // const [displayLength, setDisplayLength] = useState(false);
  const [counter, setCounter] = useState(0);
  const [incInput, setIncInput] = useState(0);
  const [decInput, setDecInput] = useState(0);
  // function handleLength() {
  //     return <p>{ props.person.name.length + props.person.lastName.length}</p>
  // }
  // function toggleName(){
  //     return shouldDisplayName ? false : true
  // }
  return (
    <div>
      {/* Displays the name on the page
            {shouldDisplayName? <p>My name is {`${props.person.name} ${props.person.lastName}`}</p>  : null}
            Displays the length of first and last name added on the page
            Displays the value returned by the handleLength function
            {displayLength ? handleLength() : null} */}

      {<p>{counter}</p>}
      {/* <button onClick={() => setShouldDisplayName(false)}>Toggle Name Appearance</button>
            <button onClick={() => setDisplayLength(true)}>Show me length</button> */}
      <button onClick={() => setCounter(counter + 1)}>Increment by 1</button>
      <button onClick={() => setCounter(0)}>Reset</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement by 1</button>
      <input onChange={(e) => setIncInput(parseInt(e.target.value))}></input>
      <button
        onClick={() => setCounter(incInput + counter)}
      >{`INCREASE BY ${incInput}`}</button>

      <input onChange={(e) => setDecInput(parseInt(e.target.value))}></input>
      <button
        onClick={() => setCounter(counter - decInput)}
      >{`DECREASE BY ${incInput}`}</button>
    </div>
  );
};

export default ImageCount;
