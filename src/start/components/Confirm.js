import React, { useState } from "react";

export default function Confirm(props) {
  const usesInstructure = props.school.domain.endsWith("instructure.com");
  const [includeOtherSchools, setIncludeOtherSchools] = useState(false);
  return (
    <div
      style={{
        width: 400,
        padding: "8px 24px 16px 24px",
        borderRadius: 12,
        margin: "auto",
        backgroundColor: "white",
      }}
    >
      <h3>{`${props.school.name}${
        includeOtherSchools ? " + Other Schools" : ""
      }`}</h3>
      <p>
        {usesInstructure
          ? includeOtherSchools
            ? "Canvas+ will ask you for more permissions to make sure it works at other schools."
            : "This school is compatible with Canvas+. Do you plan on attending another school or university in the future?"
          : `This school uses a custom website instead of "instructure.com," so Canvas+ needs extra permissions to work.`}
      </p>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            if (usesInstructure && !includeOtherSchools) {
              setIncludeOtherSchools(true);
              return;
            } else {
              chrome.permissions.request(
                {
                  origins: ["<all_urls>"],
                },
                (granted) => {
                  if (granted) {
                    location.href = "https://canvasplus.org/welcome";
                  }
                }
              );
            }
          }}
        >
          {!usesInstructure || includeOtherSchools ? "Continue" : "Yes"}
        </button>
        <button
          className="secondary"
          onClick={() => {
            if (usesInstructure && !includeOtherSchools) {
              location.href = "https://canvasplus.org/welcome";
              return;
            } else {
              setIncludeOtherSchools(false);
              props.clearSchool();
            }
          }}
        >
          {!usesInstructure || includeOtherSchools ? "Change School" : "No"}
        </button>
      </div>
    </div>
  );
}
