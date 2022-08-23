import { MantineProvider, Button } from "@mantine/core";
import { useState } from "react";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="main-container">
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "dark" }}
      >
        <Header />
        <h1>my app</h1>
        <button
          onClick={() => {
            api.send("openDevtools");
          }}
        >
          open devtools aaa
        </button>

        <Button
          onClick={() => {
            api.send("reload");
          }}
        >
          reload
        </Button>

        <Button>
          切换
        </Button>
      </MantineProvider>
    </div>
  );
};

export default App;
