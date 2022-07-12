import React, { useState } from "react";
import styled from "styled-components";
import { authService } from "../firebase";

const Container = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AuthInput = styled.input`
  max-width: 350px;
  width: 100%;
  padding: 15px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  font-size: 12px;
  color: black;
`;

const AuthInputAuthSubmit = styled.input`
  max-width: 350px;
  width: 100%;
  padding: 15px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  font-size: 15px;
  font-weight: 400;
  color: black;
  text-align: center;
  background: #04aaff;
  color: white;
  margin-top: 10;
  cursor: pointer;
`;

const AuthSwitch = styled.span`
  color: #04aaff;
  cursor: pointer;
  margin-top: 35px;
  margin-bottom: 45px;
  display: block;
  font-size: 13px;
  text-decoration: underline;
`;

const AuthError = styled.span`
  color: tomato;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <Container onSubmit={onSubmit}>
        <AuthInput
          onChange={onChange}
          name="email"
          type="email"
          required
          placeholder="email"
        />
        <AuthInput
          onChange={onChange}
          name="password"
          type="password"
          required
          placeholder="password"
          minLength={6}
        />
        <AuthInputAuthSubmit type="submit" value="submit" />
        <AuthError>{error}</AuthError>
      </Container>
      <AuthSwitch onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </AuthSwitch>
    </>
  );
};

export default LoginForm;
