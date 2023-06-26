import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "App.css";

import Navbar from "app/components/Navbar/Navbar";
import Routes from "app/components/Routes";

import { createServer } from "miragejs"

let server = createServer()
server.get("/api/users", { users: [{ id: 1, name: "Bob" }] })



const App = () => {
  let [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.users)
      })
  }, [])

  return (
    <Router>
          <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>

      <Navbar />
      <Routes />
    </Router>
  );
};

export default App;
