import { makeAutoObservable } from "mobx";

class Setting {
  theme: "dark" | "light" = "light";

  loginVisible: boolean = false;
  playDetailVisible: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  toggleTheme = () => {
    this.theme = this.theme === "dark" ? "light" : "dark";
  };
  toggleLoginVisible = (value: boolean) => {
    this.loginVisible = value;
  };

  togglePlayDetailVisible = () => {
    this.playDetailVisible = !this.playDetailVisible;
  };
}

export default Setting;
