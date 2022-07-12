import React, { useState } from "react";
import styled from "styled-components";
import { storageService, dbService } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const FactoryForm = styled.form`
  display: flex;
  width: 100%;
`;

const FactoryInputAAcontainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
`;

const FactoryInputAAInput = styled.input`
  flex-grow: 1;
  width: 100%;
  height: 45px;
  padding: 5px 20px;
  color: white;
  border: 1px solid #04aaff;
  border-radius: 20px;
  font-weight: 500;
  font-size: 12px;
  margin-right: 15px;
`;

const FactoryInputAAArrow = styled.input`
  position: absolute;
  right: -5px;
  top: 0;
  background-color: #04aaff;
  height: 44px;
  width: 44px;
  padding: 10px 0px;
  font-size: 25px;
  text-align: center;
  border-radius: 22px;
  color: white;
  cursor: pointer;
`;

const FactoryInputAALabel = styled.label`
  color: #04aaff;
  margin: 30px 0;
  cursor: pointer;
  span {
    margin-right: 3px;
  }
`;

const FactoryFormAAAttachment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
`;

const FactoryFormAAClear = styled.div`
  color: #04aaff;
  cursor: pointer;
  text-align: center;
  margin-top: 5px;
  span {
    margin-right: 10px;
    font-size: 12px;
  }
`;

const CreateTweet = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("tweets").add(nweetObj);
    setTweet("");
    setAttachment("");
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  return (
    <FactoryForm onSubmit={onSubmit}>
      <FactoryInputAAcontainer>
        <FactoryInputAAInput
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
        />
        <FactoryInputAAArrow type="submit" value="+" />
        <FactoryInputAALabel htmlFor="attach-file">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </FactoryInputAALabel>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 1,
            width: 0,
            height: 0,
          }}
        />
        {attachment && (
          <div>
            <FactoryFormAAAttachment>
              <img
                src={attachment}
                style={{
                  backgroundImage: attachment,
                }}
                alt="Error"
              />
              <FactoryFormAAClear onClick={() => setAttachment("")}>
                <span>Remove</span>
                <FontAwesomeIcon icon={faTimes} />
              </FactoryFormAAClear>
            </FactoryFormAAAttachment>
          </div>
        )}
      </FactoryInputAAcontainer>
    </FactoryForm>
  );
};

export default CreateTweet;
