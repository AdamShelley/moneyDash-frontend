import React from "react";
import Dashboard from "./views/Dashboard";
import Navbar from "./components/Nav/Navbar";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Dashboard />
      {/* Switch to account/adjustments/settings route */}
    </div>
  );
}

export default App;
