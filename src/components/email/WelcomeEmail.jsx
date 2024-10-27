import * as React from "react";
import { Html, Heading, Head } from "@react-email/components";

export function WelcomeEmail(name, role) {
  return `<html lang="en">
      <head>
        <title>Welcome</title>
      </head>
      <h2>Hi Admin</h2>
      <h3>New User Registered</h3>
      <h4>Name - ${name}</h4>
      <h4>Role - ${role}</h4>
      <h3><a href="" style="color:blue;text-decoration:underline;">Click here</a> to activate their account</h3>
    </html>`;
}

export default WelcomeEmail;

// Hi, Admin
// New user registered
// Name -
// Role-
// Please activate their account
