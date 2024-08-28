import React from "react";
import { Route, Routes } from "react-router-dom";

import withTabbar from "./components/withTabbar";
import Index from "./pages/Index";
import Leaderboard from "./pages/Leaderboard";
import Friends from "./pages/Friends";
import Welcome from "./pages/WelcomeWizard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={withTabbar(Index)}></Route>
        <Route path="/leaderboard" Component={withTabbar(Leaderboard)}></Route>
        <Route path="/friends" Component={withTabbar(Friends)}></Route>
        <Route path="/welcome" Component={Welcome}></Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </>
  );
}

export default App;
