import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../firebase";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

const ProfileForm = styled.form`
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  padding: 50px 0 30px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid black;
  text-align: center;
  background-color: white;
  color: black;
`;

const FormBtn = styled.input`
  cursor: pointer;
  width: 100%;
  padding: 13px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  background-color: #04aaff;
  cursor: pointer;
`;

const FormBtnCancelBtnLogOut = styled.span`
  cursor: pointer;
  width: 100%;
  padding: 13px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  background-color: tomato;
  margin-top: 40px;
`;

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName === null ? "" : userObj.displayName
  );

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
    refreshUser();
    navigate("/");
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  });

  return (
    <Container>
      <ProfileForm onSubmit={onSubmit}>
        <FormInput
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <FormBtn
          type="submit"
          value="Update Profile"
          style={{
            marginTop: 10,
          }}
        />
      </ProfileForm>
      <FormBtnCancelBtnLogOut onClick={onLogOutClick}>
        Log Out
      </FormBtnCancelBtnLogOut>
    </Container>
  );
};

export default Profile;
