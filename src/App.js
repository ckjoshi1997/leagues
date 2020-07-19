import React from "react";
import logo from "./logo.svg";
import Chinmay from "./profile.jpg";
import "./App.css";
import Table from "react-bootstrap/Table";

function Header({ title }) {
  return (
    <div
      style={{
        backgroundColor: "#e3fcfc",
        color: "black",
        fontSize: "30px",
        textAlign: "center",
        margin: "auto",
        width: "50%",
        border: "10px solid #42f5f2",
        padding: "20px",
      }}
    >
      {title}
    </div>
  );
}

function Photo({ picture }) {
  return (
    <>
      <img
        style={{
          width: "40%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "80%",
        }}
        src={picture}
      />
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          //height: "50px",
          //fontSize: "30px",
          textAlign: "center",
          margin: "auto",
          width: "50%",
          border: "10px solid black",
          padding: "20px",
        }}
      >
        Premier League Teams
      </div>
    </>
  );
}

function Card({ title, body, color }) {
  return (
    <div
      style={{
        backgroundColor: color,
      }}
    >
      {title}
      <br />
      {body}
    </div>
  );
}

function App() {
  const [teams, setTeams] = React.useState({
    api: {
      teams: [],
    },
  });

  React.useEffect(() => {
    let ignore = false;
    const getTeams = async () => {
      const config = {
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "1b32d3f8d0mshacd6693ab08b115p16a018jsnbc27b9212b41",
        },
      };
      fetch("https://api-football-v1.p.rapidapi.com/v2/teams/league/2/", config)
        .then((response) => response.json())
        .then((data) => setTeams(data));
    };
    getTeams();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Header title="Chinmay's first website" />
      <Photo picture={Chinmay} />
      <Table
        style={{
          width: "40%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th>Team ID</th>
            <th>Team Name</th>
            <th>Logo</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {teams.api.teams.map((team) => (
            <tr>
              <td>{team.team_id}</td>
              <td>{team.name}</td>
              <td>
                <img src={team.logo} />
              </td>
              <td>{team.venue_city}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default App;
