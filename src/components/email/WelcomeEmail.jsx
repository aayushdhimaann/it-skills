import * as React from "react";
import { Html, Heading, Head } from "@react-email/components";

export function WelcomeEmail(props) {
  const { name } = props;

  return (
    <Html lang="en">
      <Head>
        <title>Welcome</title>
      </Head>
      <Heading as="h2">Welcome {name}</Heading>
    </Html>
  );
}

export default WelcomeEmail;
