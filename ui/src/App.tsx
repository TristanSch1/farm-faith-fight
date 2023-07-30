import React, { useState } from "react";
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
  EmpireAvatar,
  EmpiresHeader,
  EmpireStatus,
} from "./components";
import { TDOMAIN } from "../../src/lib/CardTemplate";

const App = () => {
  const [waitingList, setWaitingList] = useState<{ progress: number; domain: TDOMAIN }[]>([]);

  const addWaitingList = () => {
    setWaitingList([
      ...waitingList,
      {
        progress: 0,
        domain: ["army", "religion", "trade"][Math.floor(Math.random() * 3)],
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
      </div>

      <EmpiresHeader>
        <EmpireStatus fill={80}>
          <EmpireAvatar race_name="elf" />
        </EmpireStatus>

        <EmpireStatus fill={20}>
          <EmpireAvatar race_name="orc" />
        </EmpireStatus>

        <EmpireStatus fill={60}>
          <EmpireAvatar race_name="human" />
        </EmpireStatus>

        <EmpireStatus fill={66}>
          <EmpireAvatar race_name="undead" />
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

      <CardDrawPile>
        <Card
          domain="religion"
          race="orc"
          type="building/spiritualPlace"
          tier={1}
          title="Lieu spirituel"
          description="Découvrez le Cercle Spirituel, un humble lieu de sanctuaire en pleine plaine, entouré de la sérénité de la forêt environnante. Les piliers de terre et de pierre dressés ici accueillent les païens démunis mais ardents, qui viennent y accomplir leurs rituels avec ferveur. Ce lieu sacré transcende les races, accueillant tous ceux qui cherchent la paix intérieure."
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
