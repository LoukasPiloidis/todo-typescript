import React from "react";
import '../styles/Welcome.css';
import { Signup } from "./Signup";

export const Welcome: React.FC = () => {

  return (
    <div className="welcome__main">
      <Signup />
      <p className="login-prompt">Already a user? Login <a href="/login">here</a></p>
    </div>
  );
};

