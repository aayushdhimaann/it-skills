import * as React from "react";
import { Html, Heading, Head } from "@react-email/components";

export function ContactMail(name, no, bio) {
  return `<html lang="en">
      <head>
        <title>Welcome</title>
      </head>
      <h2>Hello Admin !!</h2>
      <h3>New Query from </h3>
      <h4>Name - ${name}</h4>
      <h4>Contact no - ${no}</h4>
      <h3>Query : ${bio}</h3>
      
    </html>`;
}

export default ContactMail;
