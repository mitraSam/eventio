import React from "react";
import Form2 from "./Form2";
const Test = () => (
  <div>
    <Form2
      title="Sign in to Envatio."
      byline="Enter your details below"
      fields={["name", "name2", "password", "email"]}
      btnLabel="Sign in"
      link={{
        href: "/signup",
        text: "Dont have an account?",
        extra: "sign up"
      }}
    />
  </div>
);

export default Test;
