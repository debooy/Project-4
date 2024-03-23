import { useState } from "react";
import "./App.css";
import APIForm from "./components/APIForm";

function App() {
  return (
    <>
      <div>
        <h1>Random Cat Breed Facts!</h1>
        <p>Click this button for facts about cat breed facts!</p>
      </div>
      <APIForm></APIForm>
    </>
  );
}

export default App;
