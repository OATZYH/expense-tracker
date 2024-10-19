"use client";
import React, { useState, useMemo } from "react";
import {
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import axios from "axios";
import { apiUrls } from "@/lib/apiUrl";

// TODO: Add validation from backend
export default function SignupForm() {
  const [email, setEmail] = useState("");
  // Helper function to validate email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const handleSignup = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(apiUrls.auth.signup);
    try {
      const res = await axios.post(apiUrls.auth.signup, data);
      console.log(res);
      if(res.status === 200) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card className="p-4">
      <CardHeader>
        <h1 className="text-2xl font-bold">Sign up</h1>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4 h-full" onSubmit={handleSignup}>
          <Input
            isRequired
            name="username"
            label="Username"
            labelPlacement="inside"
            type="text"
          />
          <Input
            isRequired
            name="email"
            label="Email"
            labelPlacement="inside"
            type="email"
            value={email}
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : ""}
            onValueChange={(value) => {
              setEmail(value);
            }}
            errorMessage="Please enter a valid email"
          />
          <Input
            isRequired
            name="password"
            label="Password"
            labelPlacement="inside"
            type="password"
          />
          <p className="text-center text-small">
            Already have an account?{" "}
            <Link size="sm" href="/login">
              Login
            </Link>
          </p>
          <div className="flex gap-2 justify-end">
            <Button fullWidth color="primary" type="submit" isDisabled>
              Sign up
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
