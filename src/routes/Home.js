import React, { useState, useEffect } from "react";
import { dbService } from "../firebase";
import CreateTweet from "../components/CreateTweet";
import styled from "styled-components";
import Tweet from "../components/Tweet";

const Container = styled.div`
  width: 100%;
  max-width: 370px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  flex-direction: column;
  margin-top: 50px;
`;

const Tweetsdiv = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(nweetArray);
    });
  }, []);

  return (
    <Container>
      <CreateTweet userObj={userObj} />
      <Tweetsdiv>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </Tweetsdiv>
    </Container>
  );
};

export default Home;
