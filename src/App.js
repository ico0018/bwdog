import React from "react";
import { Route, Routes } from "react-router-dom";

import Index from "./pages/Index";
import Welcome from "./pages/WelcomeWizard";
import withTabbar from "./components/withTabbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={withTabbar(Index)}></Route>
        <Route path="/welcome" Component={Welcome}></Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </>
  );
}

export default App;
