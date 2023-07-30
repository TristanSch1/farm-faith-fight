import { observer } from "mobx-react";
import { BuildWaitingList, ConstructionIcon, EconomyHeader, EconomyItem } from "../../../ui/src/components";
import { gameStore } from "../../stores/GameStore.ts";

export const Economy = observer(() => {
  console.log(gameStore.buildingsIncoming);
  return (
    <EconomyHeader>
      <EconomyItem fill={gameStore.player!.empire.food / 2} type="FOOD" />
      <EconomyItem fill={gameStore.player!.empire.wood / 2} type="WOOD" />

      <div className="divider"></div>
      <BuildWaitingList values={gameStore.buildingsIncoming}>
        {gameStore.buildingsIncoming.map(({ domain }) => {
          if (!domain) return <div></div>;
          return <ConstructionIcon domain={domain} key={domain} />;
        })}
      </BuildWaitingList>
    </EconomyHeader>
  );
});
