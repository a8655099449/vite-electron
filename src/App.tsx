import { useState } from "react";

const App: React.FC = () => {
  return (
    <div>
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
