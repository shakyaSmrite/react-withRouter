function Card(props) {
  //destructure props
  const { employer, universityName, jobTitle } = props;

  //console.log(props,'props')

  return (
    <div>
      {employer}
      {"--"}
      {universityName}
      {"--"}
      {jobTitle}
    </div>
  );
}

export default Card;
