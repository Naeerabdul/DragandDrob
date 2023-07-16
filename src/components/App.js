import React from "react";
import DragAndDrop from './DragAndDrop'
import data from './dataa.json';
import "bootstrap/dist/css/bootstrap.css";
import './drag.css'
function App() {
let theDataQuestion = data.body.questions[0].data.question;
let theDataanswers = data.body.questions[0].data.answers;



  return (
    <div className="App">
            <DragAndDrop
        theDataQuestion={theDataQuestion}
        theDataanswers={theDataanswers}
      />
    </div>
  );
}

export default App;
