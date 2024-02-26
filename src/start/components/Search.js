import React, { useEffect, useState } from "react";

export default function Search(props) {
  const [query, setQuery] = useState("");

  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const search = setTimeout(
      () => {
        fetch(
          `https://canvas.instructure.com/api/v1/accounts/search?domain=${query}`
        ).then((res) => {
          res.json().then((json) => {
            setSchools(json.slice(0, 5));
          });
        });
      },
      query.length > 3 ? 200 : 0
    );

    return () => clearTimeout(search);
  }, [query]);
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 500,
        margin: "auto",
        position: "relative",
      }}
    >
      <div style={{ width: "100%", textAlign: "center" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What URL does your school use?"
          style={{
            width: "100%",
            padding: "16px 24px",
            backgroundColor: "white",
            border: "1px solid #ECECEC",
            borderRadius: "100px",
            outline: "none",
          }}
        ></input>
      </div>
      <div
        style={{
          width: "100%",
          padding: "0 24px",
          position: "absolute",
          top: "100%",
        }}
      >
        {schools.map((school, idx) => {
          return (
            <div
              className="school-search-result"
              key={idx}
              style={{
                marginTop: 12,
                backgroundColor: "white",
                padding: "0 24px",
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid #ECECEC",
                cursor: "pointer",
              }}
              onClick={() => {
                props.onSchoolSelect(school);
              }}
            >
              <p
                style={{
                  color: "black",
                }}
              >
                {school.domain}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
