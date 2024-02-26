import React, { useState } from "react";
import Search from "./components/Search";
import Confirm from "./components/Confirm";

export default function Start() {
  const [school, setSchool] = useState(null);
  return (
    <div
      style={{
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div>
        <div
          style={{
            margin: "40px 0",
            textAlign: "center",
          }}
        >
          <h1>Search for Your School</h1>
          <p>
            To make sure Canvas+ works correctly, enter the URL you use to
            access Canvas.
          </p>
        </div>
        {school === null ? (
          <Search onSchoolSelect={setSchool} />
        ) : (
          <Confirm
            school={school}
            clearSchool={() => {
              setSchool(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
