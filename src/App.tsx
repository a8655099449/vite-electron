import { useState } from "react";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="main-container">
      <Header />
      <h1>my app</h1>
      <button
        onClick={() => {
          api.send("openDevtools");
        }}
      >
        open devtools aaa
      </button>

      <button
        onClick={(e) => {
          api.send("reload");
        }}
      >
        reload
      </button>
    </div>
  );
};

export default App;
