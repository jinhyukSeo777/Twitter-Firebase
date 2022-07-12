import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Li = styled.li`
  margin-right: 10px;
`;

const Nav = ({ userObj }) => (
  <nav>
    <ul
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 60,
        marginBottom: 10,
        width: 250,
      }}
    >
      <Li>
        <Link
          to="/"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
          <span style={{ marginTop: 10 }}>Home</span>
        </Link>
      </Li>
      <Li>
        <Link
          to="/profile"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <span style={{ marginTop: 10 }}>
            {userObj.displayName
              ? `${userObj.displayName}의 Profile`
              : "Profile"}
          </span>
        </Link>
      </Li>
    </ul>
  </nav>
);
export default Nav;
