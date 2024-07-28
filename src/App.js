import { themes } from "./content";

function App() {
  return (
    <ul>
      {themes.map((theme) => (
        <li>
          <p>{theme.header}</p>
          <ul>
            {theme.questions.map(({ question, answer }) => (
              <li>
                <p>{question}</p>
                <p>{answer}</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default App;
