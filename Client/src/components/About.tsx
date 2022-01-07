import React, { useEffect } from "react";
import '../styles/About.css';

interface AboutProps {
  getUser: GetUser;
};

export const About: React.FC<AboutProps> = ({ getUser }) => {

  const id: string | null = sessionStorage.getItem('user');

  useEffect(() => {
    getUser(id);
  }, []);

  return (
    <div className="about-main">
      <h2 className="about-title">About this app</h2>
      <p>This app was developed with Typescript, React, and socket.io. It is deployed on Heroku, as part of an assignment for ubiquity's screening process.</p>
      <br />
      <p>The sole developer is Loukas Piloidis.</p>
      <br />
      <p>You can find his GitHub page <a href="https://github.com/LoukasPiloidis">here</a>, his linkedIn profile <a href="https://www.linkedin.com/in/loukaspiloidis/">here</a>, and his facebook profile <a href="https://www.facebook.com/loukas.piloidis">here</a>.</p>
    </div>
  );
};