import "../styles/App.css";
import { Cards } from "./Cards";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { FaGithub, FaHtml5, FaCss3Alt, FaNode, FaReact } from "react-icons/fa";
import { SiTypescript, SiJavascript } from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";

const images = [
  <FaGithub className="frontLogo cardLogo" />,
  <FaHtml5 className="frontLogo cardLogo" />,
  <FaCss3Alt className="frontLogo cardLogo" />,
  <FaNode className="frontLogo cardLogo" />,
  <FaReact className="frontLogo cardLogo" />,
  <SiJavascript className="frontLogo cardLogo" />,
  <SiTypescript className="frontLogo cardLogo" />,
  <TbBrandVscode className="frontLogo cardLogo" />,
  <FaGithub className="frontLogo cardLogo" />,
  <FaHtml5 className="frontLogo cardLogo" />,
  <FaCss3Alt className="frontLogo cardLogo" />,
  <FaNode className="frontLogo cardLogo" />,
  <FaReact className="frontLogo cardLogo" />,
  <SiJavascript className="frontLogo cardLogo" />,
  <SiTypescript className="frontLogo cardLogo" />,
  <TbBrandVscode className="frontLogo cardLogo" />,
];

function App() {
  const [time, setTime] = useState(100);
  const [flips, setFlips] = useState<number>(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<JSX.Element[]>(() =>
    shuffle()
  );
  const [visibleCards, setVisibleCards] = useState<ReadonlySet<JSX.Element>>(
    new Set()
  );
  const [matchedCards, setMatchedCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }

      if (time === 0) {
        setGameOver(true);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  function handleStart() {
    setStartGame(true);
  }

  function shuffle() {
    const shuffledArray = [...images];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[random]] = [
        shuffledArray[random],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  function newGame() {
    setFlips(0);
    setStartGame(false);
    setWin(false);
    setTime(100);
    setGameOver(false);
    setShuffledCards(shuffle());
    setVisibleCards(new Set());
    setMatchedCards([]);
  }

  return (
    <div className="App">
      <h1 className="title shadow">Mix or Match</h1>
      {!startGame && (
        <div
          className={clsx("menuText", { visible: !startGame })}
          onClick={handleStart}
        >
          Start the Game
        </div>
      )}
      {gameOver && (
        <div id="lose" className={clsx("menuText", { visible: gameOver })}>
          Loser
          <span className="small" onClick={newGame}>
            Restart Game
          </span>
        </div>
      )}
      {win && (
        <div id="win" className={clsx("menuText", { visible: win })}>
          Winner
          <span className="small" onClick={newGame}>
            Restart Game
          </span>
        </div>
      )}
      <div className="game">
        <div className="information-container">
          <div className="information">
            Time: <span id="time">{time}</span>
          </div>
          <div className="information">
            Flips: <span id="flips">{flips}</span>
          </div>
        </div>
        <Cards
          visibleCards={visibleCards}
          setVisibleCards={setVisibleCards}
          matchedCards={matchedCards}
          setMatchedCards={setMatchedCards}
          shuffledCards={shuffledCards}
          setFlips={setFlips}
          setWin={setWin}
        />
      </div>
    </div>
  );
}

export default App;
