import React from "react";
import '../styles/Welcome.css';
import { Login } from "./Login";
import { Signup } from "./signup";

export const Welcome: React.FC = () => {

  return (
    <div className="welcome__main">
      <Signup />
      <p className="login-prompt">Already a user? Login <a href="/login">here</a></p>
    </div>
  );
};

