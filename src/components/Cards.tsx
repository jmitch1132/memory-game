import { BsCodeSlash } from "react-icons/bs";
import "../styles/Cards.css";
import clsx from "clsx";
import { useCallback, useEffect } from "react";

export function Cards({
  setFlips,
  shuffledCards,
  setMatchedCards,
  matchedCards,
  visibleCards,
  setVisibleCards,
  setWin,
}: {
  setFlips: (flips: (currentFlips: number) => number) => void;
  shuffledCards: JSX.Element[];
  setMatchedCards: (cards: JSX.Element[]) => void;
  matchedCards: JSX.Element[];
  visibleCards: ReadonlySet<JSX.Element>;
  setVisibleCards: (cards: Set<JSX.Element>) => void;
  setWin: (win: boolean) => void;
}) {
  const cards = [];
  const checkForMatch = useCallback(() => {
    const [card1, card2] = Array.from(visibleCards.values());
    if (card1.type === card2.type) {
      const newMatched = [...matchedCards];
      newMatched.push(card1, card2);
      setMatchedCards(newMatched);
      if (newMatched.length === shuffledCards.length) {
        setWin(true);
      }
    }

    setVisibleCards(new Set());
  }, [
    visibleCards,
    matchedCards,
    shuffledCards,
    setVisibleCards,
    setMatchedCards,
    setWin,
  ]);

  useEffect(() => {
    if (visibleCards.size === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }, [visibleCards, checkForMatch]);

  function getClass(card: JSX.Element) {
    const matched = matchedCards.includes(card);
    if (matched) {
      return clsx("visible", "matched");
    }
    if (visibleCards.has(card)) {
      return "visible";
    }
    return "";
  }

  function handleFlipCard(card: JSX.Element) {
    if (!canFlipCard(card)) {
      return;
    }

    setFlips((flips) => flips + 1);
    const newVisibleCards = new Set(visibleCards);
    newVisibleCards.add(card);
    setVisibleCards(newVisibleCards);
  }

  function canFlipCard(card: JSX.Element) {
    return (
      !visibleCards.has(card) &&
      !matchedCards.includes(card) &&
      visibleCards.size !== 2
    );
  }

  for (const card of shuffledCards) {
    cards.push(
      <div
        className={clsx("card", getClass(card))}
        onClick={() => handleFlipCard(card)}
      >
        <div className="card-back card-face">
          <BsCodeSlash className="backLogo" />
        </div>
        <div className="card-front card-face">{card}</div>
      </div>
    );
  }

  return <>{cards}</>;
}
