function NewFile(props) {
  //destructure props
  const { title } = props;

  //console.log(props,'props')

  return <div className="data2">{title}</div>;
}

export default NewFile;
