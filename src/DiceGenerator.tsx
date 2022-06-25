import React, { useEffect, useState } from "react";

const getRandomDice = (min: number, max: number): number => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
  // https://stackoverflow.com/questions/2509679/how-to-generate-a-random-integer-number-from-within-a-range
  // Design Requirements: Avoid floating point
  let array = new Uint32Array(1);
  const range = 1 + max - min;
  const buckets = Math.floor(0xffffffff / range); // RAND_MAX / RANGE
  const limit = buckets * range;
  let random = window.crypto.getRandomValues(array)[0];
  while (random >= limit) {
    random = window.crypto.getRandomValues(array)[0];
  }
  return min + (random % range)
};

const DiceGenerator: React.FC = () => {
  const [getDiceList, setDiceList] = useState<any>(undefined);
  const numwords = () => {
    const hash = parseInt(window.location.hash.substr(1));
    if(hash) {
      return hash;
    } else {
      return 3;
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    let timeout: NodeJS.Timeout;
    const fetchlist = async () => {

      const signal = controller.signal;
      timeout = setTimeout(() => controller.abort(), 2000);
      let response;
      let wordlist;
      try {
        response = await fetch("bip-0039.txt", {signal});
        if (!response.ok) {
          throw new Error("Invalid response from server fetch");
        }
        wordlist = await response.text();
        setDiceList(Object.freeze(wordlist.trim().split("\n")));
      } catch(e: any) { // TODO: This doesn't seem to be typable properly
        if (e.name === 'AbortError') {
          // Do nothing. This could be an unmount.
        } else {
          alert(e)
          throw new Error("Failed to fetch url:" + e)
        }
      } finally {
        clearTimeout(timeout);
      }

    };

    console.log("Rendered");
    fetchlist();
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  if (getDiceList === undefined) {
    return <b>Loading wordlist..</b>;
  }

  let secret: Array<string> = [];
  for (let i = 0; i < numwords(); i++) {
    let r = getRandomDice(0, getDiceList.length - 1);
    secret = secret.concat(getDiceList[r]);
  }

  secret = secret.concat(getRandomDice(0, 99).toString());

  return <b>{secret.join("-")}</b>;
};

export default DiceGenerator;
