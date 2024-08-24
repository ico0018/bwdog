import React from "react";
import { Route, Routes } from "react-router-dom";

import Index from "./pages/Index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Index}></Route>

        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </>
  );
}

export default App;
