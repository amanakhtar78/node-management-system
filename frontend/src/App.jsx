import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UploadPage from "./UploadPage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UploadPage />
    </>
  );
}

export default App;
