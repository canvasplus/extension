useReactiveFeatures([
  {
    settingName: "canvasplus-setting-quizrefill",
    onChanged: (value) => {
      if (value) {
        const FetchData = (response, onlyCorrect) => {
          fetch(response)
            .then((data) => data.text())
            .then((response) => {
              const Array = {};
              new DOMParser()
                .parseFromString(response, "text/html")
                .querySelectorAll(
                  ".question:not(.text_only_question, .file_upload_question, .essay_question)"
                )
                .forEach((element) => {
                  if
                    (((element.classList.contains("incorrect") || element.classList.contains("partial_credit") ) && onlyCorrect) || element.classList.contains("unanswered"))
                    return;
                  Array[element.id] = GetInput(element);
                });
              InjectItem(Array);
            });
        };

        const InjectItem = (value) => {
          for (elements of Object.entries(value)) {
            IsQuestion(document.querySelector(`#${elements[0]}`), elements[1]);
          }
        };

        const IsQuestion = (question, value) => {
          question?.classList.contains("multiple_choice_question") ||
          question?.classList.contains("true_false_question")
            ? question
                .querySelectorAll(".answer_label")
                .forEach((element) =>
                  element.innerText == value ? element.click() : null
                )
            : question?.classList.contains("short_answer_question")
            ? (question.querySelector(".question_input").value = value)
            : question?.classList.contains("fill_in_multiple_blanks_question")
            ? ForArrayMultiBlanks(
                question.querySelectorAll(".question_input"),
                value
              )
            : question?.classList.contains("multiple_answers_question")
            ? question
                .querySelectorAll(".answer_label")
                .forEach((element) =>
                  (value.indexOf(element.innerText) > -1 &&
                    !element.parentNode.querySelector(".question_input")
                      .checked) ||
                  (!(value.indexOf(element.innerText) > -1) &&
                    element.parentNode.querySelector(".question_input").checked)
                    ? element.click()
                    : null
                )
            : null;
          question?.classList.contains("multiple_dropdowns_question")
            ? MultiDropDowns(
                question.querySelectorAll(".question_input"),
                value
              )
            : question?.classList.contains("matching_question")
            ? document
                .querySelectorAll(".question_input")
                .forEach((element) =>
                  Array.from(element.children).forEach((child) =>
                    child.innerText ==
                    value[
                      `${element.id.split("_")[2]}_${element.id.split("_")[3]}`
                    ]
                      ? (element.value = child.value)
                      : null
                  )
                )
            : question?.classList.contains("numerical_question") ||
              question?.classList.contains("calculated_question")
            ? (question.querySelector(".question_input").value = value)
            : null;
        };

        const GetInput = (element) => {
          const value =
            element.classList.contains("multiple_choice_question") ||
            element.classList.contains("true_false_question")
              ? element.querySelector(".selected_answer").querySelector(".answer_text").innerText
              : element.classList.contains("short_answer_question")
              ? element.querySelector(".question_input").value
              : element.classList.contains("fill_in_multiple_blanks_question")
              ? Array().map.call(
                  element.querySelectorAll(".question_input"),
                  (element) => element.value
                )
              : element.classList.contains("multiple_answers_question")
              ? Array().map.call(
                  element.querySelectorAll(".question_input[checked]"),
                  (element) =>
                    element.parentNode.querySelector(".answer_text").innerText
                )
              : element.classList.contains("multiple_dropdowns_question")
              ? Array().map.call(
                  element.querySelectorAll(
                    ".selected_answer > .select_answer > label > .answer_text"
                  ),
                  (element) => element.innerText
                )
              : element.classList.contains("matching_question")
              ? Matching(element.querySelectorAll(".selected_answer"))
              : element.classList.contains("numerical_question") ||
                element.classList.contains("calculated_question")
              ? element.querySelector(".question_input").value
              : "";
          return value;
        };

        const Matching = (elements) => {
          const array = {};
          elements.forEach(
            (element) =>
              (array[element.id] =
                element.querySelector(".question_input").children[0].innerText)
          );
          return array;
        };

        const ForArrayMultiBlanks = (element, value) => {
          for (i = 0; i < element.length; i++) {
            element[i].value = value[i];
          }
        };

        const MultiDropDowns = (element, value) => {
          for (i = 0; i < element.length; i++) {
            Array.from(element[i].children).forEach((child) =>
              child.innerText == value[i]
                ? (element[i].value = child.value)
                : null
            );
          }
        };

        const quizlink = document.createElement("link");
        quizlink.href = chrome.runtime.getURL("src/inject/quiz/quiz.css");
        quizlink.type = "text/css";
        quizlink.rel = "stylesheet";
        document.documentElement.appendChild(quizlink);

        fetch(
          `https://${window.location.hostname}/courses/${window.location.pathname.split("/")[2]}/quizzes/${
            window.location.pathname.split("/")[4]
          }/submission_versions`
        )
          .then((data) => data.text())
          .then(
            (response) =>
              new DOMParser()
                .parseFromString(response, "text/html")
                .querySelector("tbody")
                .querySelector("td").children[0].href
          )
          .then((response) => {
            if (response) {
              const { dismissMe } = smallNotification(
                "Quiz Refill lets you import the answers from your previous attempt. (Experimental)",
                "magic",
                ["#E6F8FF", "#0086BA", "#006c96", "#656565", "#FFFFFF"],
                [
                  {
                    text: "Refill All",
                    callback: () => {
                      if (
                        window.confirm(
                          "By using this feature, you agree to follow your school's academic honestly guidelines when using Canvas+."
                        )
                      ) {
                        FetchData(response, false);
                        dismissMe();

                        const snackbar = setSnackbar([
                          {
                            type: "text",
                            text: "Quiz Refills are logged in settings to prevent cheating.",
                          },
                        ]);
                        setTimeout(() => {
                          removeSnackbar(snackbar);
                        }, 3500);

                        chrome.storage.sync.get(
                          ["canvasplus-quiz-refill-audit-log"],
                          (data) => {
                            const newAuditLog =
                              data["canvasplus-quiz-refill-audit-log"] ?? [];
                            newAuditLog.push({
                              timestamp: Date.now(),
                              quizTitle: document.title,
                              quizURL: document.URL,
                              correctOnly: false,
                            });
                            chrome.storage.sync.set({
                              "canvasplus-quiz-refill-audit-log": newAuditLog,
                            });
                          }
                        );
                      } else {
                        const snackbar = setSnackbar([
                          {
                            type: "text",
                            text: "Agree to the Academic Honesty prompt to use Quiz Refill.",
                          },
                        ]);
                        setTimeout(() => {
                          removeSnackbar(snackbar);
                        }, 3500);
                      }
                    },
                  },
                  {
                    text: "Correct Only",
                    callback: () => {
                      if (
                        window.confirm(
                          "By using this feature, you agree to follow your school's academic honestly guidelines when using Canvas+."
                        )
                      ) {
                        FetchData(response, true);
                        dismissMe();

                        const snackbar = setSnackbar([
                          {
                            type: "text",
                            text: "Quiz Refills are logged in settings to prevent cheating.",
                          },
                        ]);
                        setTimeout(() => {
                          removeSnackbar(snackbar);
                        }, 3500);

                        chrome.storage.sync.get(
                          ["canvasplus-quiz-refill-audit-log"],
                          (data) => {
                            const newAuditLog =
                              data["canvasplus-quiz-refill-audit-log"] ?? [];
                            newAuditLog.push({
                              timestamp: Date.now(),
                              quizTitle: document.title,
                              quizURL: document.URL,
                              correctOnly: true,
                            });
                            chrome.storage.sync.set({
                              "canvasplus-quiz-refill-audit-log": newAuditLog,
                            });
                          }
                        );
                      } else {
                        const snackbar = setSnackbar([
                          {
                            type: "text",
                            text: "Agree to the Academic Honesty prompt to use Quiz Refill",
                          },
                        ]);
                        setTimeout(() => {
                          removeSnackbar(snackbar);
                        }, 3500);
                      }
                    },
                  },
                  {
                    text: "Not Now",
                    callback: () => {
                      dismissMe();
                    },
                  },
                ]
              );
              // notification("Would you like to refill with your previous answers?", "tada", "#c2d9ff", "#3e77d6", () => {
              //     FetchData(response, false)
              // }, "Refill All", () => {
              //     FetchData(response, true)
              // }, "Correct Only", "#919eb5")
            }
          });
      } else {
        document.querySelector("#quizrefill")?.remove();
      }
    },
  },
]);
