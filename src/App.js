import React, { useState, useEffect } from "react";
import { UserList } from "./Components/UserList";
import axios from "axios";

export default function App() {
  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUserArray(response.data);
      })
      .catch(function (err) {
        console.log("err", err);
      });
  }, []);

  return (
    <div>
      <div>
        <UserList users={userArray} />
      </div>
    </div>
  );
}