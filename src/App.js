import { themes } from "./content";
import "./App.css";

function App() {
  const expand = (themeIndex, answerIndex) => {
    if (typeof answerIndex === "number") {
      const target = document.querySelector(
        `.question-${themeIndex}-${answerIndex}`
      );
      const answer = target.querySelector(".answer");
      answer.classList.toggle("collapsed");
    } else {
      const elements = document.querySelectorAll(".theme");
      const target = elements[themeIndex].querySelector(".questions");
      target.classList.toggle("collapsed");
    }
  };

  return (
    <ul>
      {themes.map((theme, themeIndex) => (
        <li className={`theme theme-${themeIndex}`}>
          <p className="expandable" onClick={() => expand(themeIndex)}>
            {theme.header}
          </p>
          <ul className="questions collapsed">
            {theme.questions.map(({ question, answer }, answerIndex) => (
              <li className={`question-${themeIndex}-${answerIndex}`}>
                <p
                  className="expandable"
                  onClick={() => expand(themeIndex, answerIndex)}
                >
                  {question}
                </p>
                <p className="answer collapsed">{answer}</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default App;
