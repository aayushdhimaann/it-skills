import * as React from "react";
import { Html, Heading, Head } from "@react-email/components";

export function WelcomeEmail(name) {
  return `<html lang="en">
      <head>
        <title>Welcome</title>
      </head>
      <h2>Welcome ${name}</h2>
    </html>`;
}

export default WelcomeEmail;
