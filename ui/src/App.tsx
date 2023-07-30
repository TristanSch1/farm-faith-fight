import React, { useEffect, useRef, useState } from "react";
import { SceneContainer } from "./layouts";

import "./assets/styles/normalize.css";
import "./assets/styles/app.css";
import {
  BuildWaitingList,
  Card,
  CardDrawPile,
  ConstructionIcon,
  EconomyHeader,
  EconomyItem,
  EmpirePlayer,
  EmpiresHeader,
  EmpireStatus,
  SpyReport,
} from "./components";
import { DrawPileAPI } from "./components/Card/CardDrawPile";

const App = () => {
  const [waitingList, setWaitingList] = useState<{ progress: number; domain: string }[]>([]);
  const [spyReport, setSpyReport] = useState<
    {
      domain: string;
      tier: number;
      race?: string;
    }[]
  >([]);

  const addWaitingList = () => {
    setWaitingList([
      ...waitingList,
      {
        progress: 0,
        domain: ["ARMY", "RELIGION", "TRADE"][Math.floor(Math.random() * 3)],
      },
    ]);
  };

  const removeWaitingList = () => {
    const array = Array.from(waitingList);
    array.shift();
    setWaitingList(array);
  };

  const changeWaitingValues = () => {
    const array = Array.from(waitingList);
    if (array.length === 0) return;
    array[Math.floor(Math.random() * array.length)].progress += 25;
    setWaitingList(array);
  };

  const showSpy = () => {
    setSpyReport([
      {
        domain: "ARMY",
        tier: 1,
        race: "elf",
      },
      {
        domain: "RELIGION",
        tier: 2,
      },
      {
        domain: "TRADE",
        tier: 1,
        race: "orc",
      },
    ]);
  };

  const stopSpy = () => {
    setSpyReport([]);
  };

  const drawPileRef = useRef<DrawPileAPI>(null)

  useEffect(() => drawPileRef.current?.distribute());

  return (
    <SceneContainer>
      <div
        style={{
          position: "absolute",
          left: -250,
          display: "flex",
          flexFlow: "column",
        }}
      >
        <button onClick={addWaitingList}>Add waiting list</button>
        <div style={{ margin: "5px 0" }}></div>
        <button onClick={removeWaitingList}>Remove waiting list</button>
        <div style={{ margin: "5px 0" }}></div>
        <button onClick={changeWaitingValues}>Change waiting list progress</button>

        <div style={{ margin: "20px 0" }}></div>
        <button onClick={showSpy}>Show spy report</button>
        <div style={{ margin: "5px 0" }}></div>
        <button onClick={stopSpy}>Hide spy report</button>
        <div style={{ margin: "5px 0" }}></div>
      </div>

      <EmpiresHeader>
        <EmpireStatus fill={80}>
          <>
            <EmpirePlayer race_name="elf" pseudo="Aradehel" />
            <SpyReport data={spyReport} />
          </>
        </EmpireStatus>

        <EmpireStatus fill={20}>
          <EmpirePlayer race_name="orc" pseudo="Ulgborz" />
        </EmpireStatus>

        <EmpireStatus fill={60}>
          <EmpirePlayer race_name="human" pseudo="Leoric" />
        </EmpireStatus>

        <EmpireStatus fill={66}>
          <EmpirePlayer race_name="undead" pseudo="Phelishma" />
        </EmpireStatus>
      </EmpiresHeader>

      <EconomyHeader>
        <EconomyItem fill={35} type="FOOD" />
        <EconomyItem fill={50} type="WOOD" />

        <div className="divider"></div>

        <BuildWaitingList values={waitingList}>
          {waitingList.map(({ domain }) => (
            <ConstructionIcon domain={domain} key={domain} />
          ))}
        </BuildWaitingList>
      </EconomyHeader>

      <CardDrawPile ref={drawPileRef}>
        <Card
          domain="RELIGION"
          race="orc"
          type="building/spiritualPlace"
          tier={0}
          title="Ferme"
          description="Voici la Ferme, un havre de simplicité où le blé danse au gré du vent. Lieu de labeur et de moisson, il n'appartient à aucune race mais nourrit toutes bouches affamées. </br></br> Augmente votre production de blé."
          target="Kevin"
          turnsToBuild={3}
          buildLinks={[
            {
              name: "Caserne",
              built: false,
            },
            {
              name: "Puit de Lune",
              built: true,
            },
          ]}
        />
      </CardDrawPile>
    </SceneContainer>
  );
};

export default App;
