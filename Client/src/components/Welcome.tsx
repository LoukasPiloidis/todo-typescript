import React from "react";
import '../styles/Welcome.css';
import { Login } from "./Login";
import { Signup } from "./signup";

export const Welcome: React.FC = () => {

  return (
    <div className="welcome__main">
      <div>
        <Login />
      </div>
        <Signup />
    </div>
  );
};
