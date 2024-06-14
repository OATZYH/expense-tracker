"use client";
import React, { useState } from "react";
import {
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <h1 className="text-2xl font-bold">Log in</h1>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Email"
            labelPlacement="inside"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
          />
          <Input
            isRequired
            label="Password"
            labelPlacement="inside"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
          />
          <p className="text-center text-small">
            Need to create an account?{" "}
            <Link size="sm" href="/signup">
              Sign up
            </Link>
          </p>
          <div className="flex gap-2 justify-center">
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button fullWidth color="primary" type="submit">
                Login
              </Button>
            )}
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
