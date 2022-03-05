import React, { useState, useEffect } from "react";

import "./QuizRefillAuditLog.css";

export default function QuizRefillAuditLog({ hide }) {
  const [refills, setRefills] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    chrome.storage.sync.get(["canvasplus-quiz-refill-audit-log"], (log) => {
      setRefills(log["canvasplus-quiz-refill-audit-log"]);
    });
  }, []);

  return (
    <div
      className="QuizRefillAuditLog__Wrapper"
      onClick={() => {
        hide();
      }}
    >
      <div
        className="QuizRefillAuditLog"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <b className="QuizRefillAuditLog__Header">Quiz Refills</b>
        <input
          className="QuizRefillAuditLog__Filter"
          type="text"
          placeholder="Filter by title..."
          defaultValue={filter}
          onInput={(e) => {
            setFilter(e.target.value);
          }}
        ></input>
        {refills
          .filter((r) => {
            return r.quizTitle
              .replace(/\W/g, "")
              .toLowerCase()
              .includes(filter.replace(/\W/g, "").toLowerCase());
          })
          .reverse()
          .map((r, idx) => {
            return (
              <div key={idx} className="QuizRefillAuditLog__Block">
                <div className="QuizRefillAuditLog__Block__Title">
                  {r.quizTitle}
                </div>
                <div className="QuizRefillAuditLog__Block__Other">
                  {`${new Date(r.timestamp).toString()} on URL ${r.quizURL}
                ${r.correctOnly ? " (correct only)" : ""}`}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
