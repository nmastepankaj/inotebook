import Notes from "./Notes";


export default function Home(props) {
  const {showAlert} = props;
  return (
    <div>
      <h1>This is iNoteBook</h1>

      <Notes showAlert={showAlert}/>
    </div>
  );
}
