import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCard from "./user/UserCard";
import { UserProvider } from "./context/UserConstext";
import TodoList from "./tasks/TodoList";

function App() {
  return (
    <div>    
      <UserProvider>
      <nav class="navbar navbar-dark bg-dark px-3">
        <div class="container">
          <div class="row">
            <img class="logo col" src="/logo2.svg" alt="DFINITY logo"/>
            <img class="logo col" src="/logo.jpg" alt="Notesieve logo"/>
            <div class="user-card col"><UserCard/></div>
          </div>
        </div>
      </nav>                  
      <TodoList/>
      </UserProvider>
    </div>
  );
} 

 

export default App;
