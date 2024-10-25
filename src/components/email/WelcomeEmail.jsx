import * as React from "react";
import { Html, Heading, Head } from "@react-email/components";

export function WelcomeEmail(name, newusername, role) {
  return `<html lang="en">
      <head>
        <title>Welcome</title>
      </head>
      <h2>Hi Admin ${name} !!</h2>
      <h3>New User Registered</h3>
      <h4>Name - ${newusername}</h4>
      <h4>Role - ${role}</h4>
      <h3>Please Activate their account by clicking on the following link</h3>
      <a href="">register new entry</a>
    </html>`;
}

export default WelcomeEmail;

// Hi, Admin
// New user registered
// Name -
// Role-
// Please activate their account
