import { useEffect, useState } from "react";
import { getGameDuration, waves } from "../../data/waveData";
import { formatScore } from "../../utils";
import BalloonGenerator from "../BalloonGenerator";
import { FlagThing } from "../animations/FlagThing";
import { RamScreen } from "../routes/Ram";

let interval: NodeJS.Timeout;

interface Props {
  setScreen: React.Dispatch<React.SetStateAction<RamScreen>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const RamGame = ({ setScreen, score, setScore }: Props) => {
  const gameTime = getGameDuration(waves);
  const [time, setTime] = useState(gameTime);
  const [waveTime, setWaveTime] = useState(0);
  const [waveIndex, setWaveIndex] = useState(0);
  const [wave, setWave] = useState(waves[0]);

  useEffect(() => {
    interval = setInterval(() => {
      setTime((t) => Math.max(t - 1, 0));
      setWaveTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [wave]);

  useEffect(() => {
    if (time <= 0) setScreen("end-screen");
  }, [time]);

  useEffect(() => {
    if (waveIndex >= waves.length) return;

    if (waveTime > waves[waveIndex].duration) {
      setWaveIndex((i) => i + 1);
      setWaveTime(1);
    }
  }, [waveTime, wave, waveIndex]);

  useEffect(() => {
    if (waveIndex >= waves.length) return;

    setWave(waves[waveIndex]);
    console.log("WAVE:", waves[waveIndex]);
  }, [waveIndex]);

  return (
    <div>
      <FlagThing />
      <div className="ram__hud">
        <span className="ram__time no-select">
          00:{formatScore(time, 2)}
        </span>
        <span className="ram__score no-select">
          {formatScore(score)}
        </span>
      </div>
      <div>
        <BalloonGenerator setScore={setScore} wave={wave} />
      </div>
    </div>
  );
};

export default RamGame;
