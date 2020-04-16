import React from "react";

import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <div className="personal-settings">
        <p>Change Name</p>
        <p>Change Email</p>
        <p>Change Password</p>
      </div>

      <div className="settings-buttons">
        <button>DELETE ALL DATA</button>
        <button>DELETE ACCOUNT</button>
      </div>
    </div>
  );
};

export default Settings;
