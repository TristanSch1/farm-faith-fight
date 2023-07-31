import { EmpireAvatar, EmpiresHeader, EmpireStatus, SpyReport } from "../../../ui/src/components";
import { cardDictionnary } from "../../lib/CardDictionnary.ts";
import { gameStore } from "../../stores/GameStore.ts";
import { observer } from "mobx-react";

export const Players = observer(() => {
  return (
    <EmpiresHeader>
      {Object.entries(gameStore.game!.players).map(([playerId, player]) => {
        const queue = gameStore.game?.players[gameStore.playerId].empire.spyingQueue || [];
        const isSpied = queue.some((spy) => spy.playerId === playerId);
        const buildings = gameStore.game?.players[playerId].empire.buildings || [];

        const spyData = buildings.filter((building) => {
          const { domain } = cardDictionnary[building].template;
          return !['FOOD', 'WOOD'].includes(domain!);
        }).map((building) => {
          const { domain, tier, race } = cardDictionnary[building].template;
          return {
            domain,
            tier,
            race: ["NEUTRAL", "NONE"].includes(race || "") ? undefined : race,
          };
        });

        return (
          <EmpireStatus fill={gameStore.player!.empire.health} key={playerId}>
            <>
              <EmpireAvatar race_name={player.empire.name} pseudo={gameStore.players![playerId].displayName} />
              {isSpied && (
                <SpyReport
                  data={
                    spyData as Array<{
                      domain: string;
                      tier: number;
                      race?: string;
                    }>
                  }
                />
              )}
            </>
          </EmpireStatus>
        );
      })}
    </EmpiresHeader>
  );
});
