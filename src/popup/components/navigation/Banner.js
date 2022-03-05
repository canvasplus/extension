import React, { Component } from "react";

import "./Banner.css";
import QuizRefillAuditLog from "./QuizRefillAuditLog";

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoutShowing: false,
      copied: "Copy to Clipboard",
      installationInfo: "<loading>",
      surveySeed: "<loading>",
      qarlShowing: false,
    };
  }

  componentDidMount() {
    chrome.storage.local.get(
      ["installDate", "canvasplus-survey-seed-1"],
      (data) => {
        this.setState({
          installationInfo: JSON.stringify(data["installDate"]),
          surveySeed: data["canvasplus-survey-seed-1"],
        });
      }
    );
  }

  render() {
    return (
      <>
        <div className="Navigation__Banner">
          <img
            className="Navigation__Banner__image"
            src="../../../assets/icons/canvasplus-icon-white.png"
            onClick={() => {
              this.setState({ popoutShowing: true });
            }}
          ></img>
        </div>

        {this.state.popoutShowing ? (
          <>
            <div
              className="Navigation__Banner__Popout__Wrapper"
              onClick={() => {
                this.setState({ popoutShowing: false });
              }}
            ></div>

            <div className="Navigation__Banner__Popout">
              <div className="Navigation__Banner__PopoutPadding">
                <b>Debug Info</b>
                <div className="Navigation__Banner__Popout__DebugInfo">
                  <p>
                    {"(" +
                      chrome.runtime.getManifest().version +
                      ") " +
                      chrome.runtime.id}
                  </p>
                  <p>{navigator.userAgent}</p>
                  <p>{`Installation Info: ${this.state.installationInfo} Survey Seed (1): ${this.state.surveySeed}`}</p>

                  <button
                    onClick={() => {
                      if (!navigator?.clipboard?.writeText) {
                        this.setState({ copied: "Couldn't Copy to Clipboard" });
                      } else {
                        navigator.clipboard.writeText(
                          "(" +
                            chrome.runtime.getManifest().version +
                            ") " +
                            chrome.runtime.id +
                            " // " +
                            navigator.userAgent +
                            " // " +
                            `Installation Info: ${this.state.installationInfo} Survey Seed (1): ${this.state.surveySeed}`
                        );
                        this.setState({ copied: "Copied to Clipboard" });
                      }
                    }}
                  >
                    {this.state.copied}
                  </button>

                  <button
                    style={{ display: "block" }}
                    onClick={() => {
                      this.setState({ qarlShowing: true });
                    }}
                  >
                    Quiz Refill Audit Log
                  </button>

                  {this.state.qarlShowing ? (
                    <QuizRefillAuditLog
                      hide={() => {
                        this.setState({ qarlShowing: false });
                      }}
                    ></QuizRefillAuditLog>
                  ) : (
                    <></>
                  )}
                </div>

                <b>Contributors</b>
                <div className="Navigation__Banner__Popout__Contributors">
                  <b>Developers</b>
                  <p>Adrian Casares</p>
                  <p>John Lozier</p>
                  <b>Icon Design</b>
                  <p>Hayes Bounds</p>
                  <p>Adrian Casares</p>
                </div>
              </div>
              <div className="Navigation__Banner__Popout__Footer">
                <a href="https://github.com/canvasplus" target={"_blank"}>
                  Contribute
                </a>
                <img
                  src="../../../assets/img/notification-emoji/blue-heart.png"
                  width={20}
                ></img>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default Banner;
