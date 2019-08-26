import React, { useEffect, useState } from 'react';

const getRandomDice = (min: number, max: number) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
  // https://stackoverflow.com/questions/2509679/how-to-generate-a-random-integer-number-from-within-a-range
  let array = new Uint32Array(1);
  const range = 1 + max - min;
  const buckets = 0xFFFFFFFF / range; // RAND_MAX / RANGE
  const limit: number = buckets * range;
  let random: number = window.crypto.getRandomValues(array)[0];
  while (random >= limit) {
    random =  window.crypto.getRandomValues(array)[0];
  }
  return Math.floor(min + (random/buckets));
}

const DiceGenerator: React.FC = () => {
  const [getDiceList, setDiceList] = useState<any>(undefined);

  
  useEffect(() => {
    const fetchlist = async () => {
      const response = await fetch("bip-0039.txt");
      if (!response.ok) {
        throw new Error("Invalid response from server fetch");
      }
      const wordlist = await response.text();
      setDiceList(wordlist.trim().split("\n"));
    };

    fetchlist();
  }, []);

  if(getDiceList === undefined) {
    return (  <b>Diceware</b>);
  }

  let secret = "";
  for (let i = 0; i <= 2; i++) {
    let r = getRandomDice(0, getDiceList.length-1);
    secret += getDiceList[r] + "-";
  }

  return (
    <b> it works { secret }</b>
  );

}

export default DiceGenerator;
