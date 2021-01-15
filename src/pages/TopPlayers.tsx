import React, { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { getToken, saveToken } from "../storage/auth";
import { Redirect, Route,useHistory } from "react-router-dom";

import "./TopPlayers.css";
import { PlayersList } from "../components/TopPlayers/PlayersList";

const HIGH_SCORES = gql`
  query GetHighScores {
    allScores(orderBy: "score_DESC", first: 50) {
      player {
        name
      }
      score
    }
  }
`;

const AUTHENTICATE = gql`
  mutation Authenticate($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      token
    }
  }
`;

type State = {
  token: String;
  isAuth: Boolean;
  loading: Boolean;
};

const TopPlayers = () => {
  const [state, setState] = useState<State>({
    token: "",
    loading: true,
    isAuth: false,
  });
  const [Authenticate, { data }] = useMutation(AUTHENTICATE);
  const { error, data: topPlayers } = useQuery(HIGH_SCORES);
  const history = useHistory();
  const LoginHandler = async () => {
    const storageToken = getToken();

    if (storageToken) {
      setState({ ...state, token: storageToken, isAuth: true });
      return;
    }
    const authResult = await Authenticate({
      variables: { email: "jakubkana@gmail.com", password: "Admin123" },
    });
    const token = authResult.data?.authenticateUserWithPassword?.token;
    //console.log(token);
    if (!token) throw Error("Authentication error");
    saveToken(token);
    setState({ ...state, token, isAuth: true });
  };

  const loading = false;
  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (state.token) {
      alert("Authenticated");
    }
  }, [state.token]);
  useEffect(() => {
    if (topPlayers) {
      //console.log(topPlayers);
      setState({ ...state, loading: false });
    }
  }, [topPlayers]);

  if (state.isAuth) {
    return (
      <Route exact path="/">
        {state.isAuth ? <Redirect to="/game" /> : ""}
      </Route>
    );
  }

  if (error) {
    console.error(error);
  }


  return (
    <div>
      <h2>Top Players</h2>
      <div className="top-players">
        {state.loading ? (
          <div>Loading top players...</div>
        ) : (
          <PlayersList topPlayers={topPlayers} />
        )}
      </div>
      <div className="newgame-buttons">
        <button onClick={LoginHandler}>Login</button>
        
        <button  onClick={() => history.push("/registration")}>Register</button>
      </div>
    </div>
  );
};

export { TopPlayers };
