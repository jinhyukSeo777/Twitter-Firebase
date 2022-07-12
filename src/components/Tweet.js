import React, { useState } from "react";
import styled from "styled-components";
import { dbService, storageService } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = styled.div`
  margin-bottom: 50px;
  background-color: white;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  color: rgba(0, 0, 0, 0.8);
  h4 {
    font-size: 14px;
    font-weight: 500;
  }
  img {
    right: -20px;
    top: 20px;
    position: absolute;
    border-radius: 50%;
    width: 54px;
    height: 54px;
    margin-top: 10px;
  }
`;

const ContainerNweetEdit = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;
`;

const FormInput = styled.input`
  width: 100%;
  background-color: red;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid black;
  text-align: center;
  background-color: white;
  color: black;
  margin-bottom: 15px;
`;

const FormBtn = styled.input`
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  background-color: #04aaff;
  cursor: pointer;
`;

const FormBtnCancelBtn = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  background-color: tomato;
  border: none;
`;

const H4 = styled.h4``;

const Img = styled.img``;

const Nweet__Actions = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  span {
    margin-left: 7px;
    font-size: 15px;
    cursor: pointer;
  }
`;

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <>
      {editing ? (
        <Nweet>
          <ContainerNweetEdit onSubmit={onSubmit}>
            <FormInput
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              required
              onChange={onChange}
            />
            <FormBtn type="submit" value="Update Tweet" />
          </ContainerNweetEdit>
          <FormBtnCancelBtn onClick={toggleEditing}>Cancel</FormBtnCancelBtn>
        </Nweet>
      ) : (
        <Nweet>
          <H4>{tweetObj.text}</H4>
          {tweetObj.attachmentUrl && <Img src={tweetObj.attachmentUrl} />}
          {isOwner && (
            <Nweet__Actions>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </Nweet__Actions>
          )}
        </Nweet>
      )}
    </>
  );
};

export default Tweet;
