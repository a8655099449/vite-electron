import React, { useContext } from "react";
import PlayerModel from "./player";
import Profile from "./profile";
import Setting from "./setting";

const context = React.createContext({
  profile: new Profile(),
  setting: new Setting(),
  player: new PlayerModel(),
});

export const useStore = () => useContext(context);
