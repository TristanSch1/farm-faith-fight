import { TCard } from "../lib/Card.ts";
import { Empire } from "../lib/Empire.ts";
import { GameState } from "../lib/types/GameState.ts";
import gameConfig from "../game.config.ts";
import { cardDictionnary, TCardBuildingType } from "../lib/CardDictionnary.ts";
import { BuildingEffect, BuildingEffectProps } from "../lib/BuildingEffect.ts";
import { ActionEffect, ActionEffectProps } from "../lib/ActionEffect.ts";
import eventsStore from "./EventsStore.ts";
import { IEventPlayCard, IEventThrowCard } from "../lib/types/EventTypes.ts";
import { BONUMALUS_DAMAGE, getBuildingsPlayerByDomainAndByTier } from "../lib/helpers/CardHelper.ts";
import { first, intersection } from "remeda";
import { TRACE } from "../lib/CardTemplate.ts";

export class GameActionsStore {
  static initEvents() {
    eventsStore.on("playCard", ({ payload }: IEventPlayCard) => {
      if (!payload?.card) return;
      if (!GameActionsStore.isPlayableCard(payload.empire, payload.card)) return;
      Rune.actions.playCard({ card: payload.card, randomPlayerIdTarget: payload.randomPlayerIdTarget });
    });

    eventsStore.on("throwCard", (_event: IEventThrowCard) => {
      Rune.actions.throwCard();
    });
  }

  static isCurrentCardBuildingCard(card: TCard) {
    return card.template.category === "BUILDING";
  }

  static isPlayableCard(empire: Empire, card: TCard) {
    if (empire.food < card.template.cost.food || empire.wood < card.template.cost.wood) {
      return false;
    }

    if (GameActionsStore.isCurrentCardBuildingCard(card)) {
      const farms = empire.buildings.filter((building) => building.includes("farm"));
      const woodFactories = empire.buildings.filter((building) => building.includes("woodFactory"));

      // Limit farm/woodFactory
      if (farms.length === gameConfig.maxFarmBuilding && card.template.id === "farm") return false;

      if (woodFactories.length === gameConfig.maxWoodFactoryBuilding && card.template.id === "woodFactory")
        return false;

      // isNotBuildable
      if ("needed" in card.effects) {
        return !!intersection(empire.buildings, (card.effects as BuildingEffect).needed!).length;
      }
    }
    return true;
  }

  static playCard(game: GameState, playerId: string, playedCard: TCard, randomPlayerIdTarget: string) {
    GameActionsStore.readBuildingsQueue(game, playerId);
    GameActionsStore.readSpyQueue(game, playerId);
    GameActionsStore.applyEffects(game, playerId, playedCard, randomPlayerIdTarget);
    game.players[playerId].empire.food -= playedCard.template.cost.food;
    game.players[playerId].empire.wood -= playedCard.template.cost.wood;
    game.players[playerId].empire.turn += 1;
  }

  static throwCard(game: GameState, playerId: string) {
    GameActionsStore.readBuildingsQueue(game, playerId);
    GameActionsStore.readSpyQueue(game, playerId);
    let wood = gameConfig.income;
    let food = gameConfig.income;
    food +=
      game.players[playerId].empire.buildings.filter((building) => building === "farm").length *
      cardDictionnary.farm.effects.income.food;
    wood +=
      game.players[playerId].empire.buildings.filter((building) => building === "woodFactory").length *
      cardDictionnary.woodFactory.effects.income.wood;

    game.players[playerId].empire.food =
      game.players[playerId].empire.food + food >= gameConfig.maxFood
        ? gameConfig.maxFood
        : game.players[playerId].empire.food + food;
    game.players[playerId].empire.wood =
      game.players[playerId].empire.wood + wood >= gameConfig.maxWood
        ? gameConfig.maxWood
        : game.players[playerId].empire.wood + wood;
    game.players[playerId].empire.turn += 1;
  }

  static applyEffects(game: GameState, playerId: string, playedCard: TCard, targetPlayerId?: string) {
    if ("turnsToBuild" in playedCard.effects) {
      GameActionsStore.applyBuildingEffect(game, playerId, playedCard);
    } else {
      GameActionsStore.applyActionEffects(game, playerId, playedCard, targetPlayerId);
    }
  }

  static applyBuildingEffect(game: GameState, playerId: string, playedCard: TCard) {
    game.players[playerId].empire.buildingsQueue.push({
      buildingType: playedCard.template.id as TCardBuildingType,
      turnsLeft: (playedCard.effects as BuildingEffect).turnsToBuild,
    });
  }

  static readBuildingsQueue(game: GameState, playerId: string) {
    if (game.players[playerId].empire.buildingsQueue.length) {
      game.players[playerId].empire.buildingsQueue.map((building, index) => {
        if (!building.turnsLeft) {
          GameActionsStore.addBuildingsEffect(game, playerId, building.buildingType);

          if ("needed" in cardDictionnary[building.buildingType].effects) {
            const neededBuildings = (cardDictionnary[building.buildingType].effects as BuildingEffectProps).needed;

            const neededBuilding = first(intersection(neededBuildings!, game.players[playerId].empire.buildings));

            if (neededBuilding) {
              const buildingIndexToRemove = game.players[playerId].empire.buildings.indexOf(neededBuilding);
              game.players[playerId].empire.buildings.splice(buildingIndexToRemove, 1);
            }
          }

          game.players[playerId].empire.buildingsQueue.splice(index, 1);
        }
        building.turnsLeft -= 1;
      });
    }
  }

  static addBuildingsEffect(game: GameState, playerId: string, building: TCardBuildingType) {
    game.players[playerId].empire.buildings.push(building);
  }

  static readSpyQueue(game: GameState, playerId: string) {
    if (game.players[playerId].empire.spyingQueue.length) {
      game.players[playerId].empire.spyingQueue = game.players[playerId].empire.spyingQueue
        .filter((spy) => spy.turnsLeft > 0)
        .map((spy) => ({ playerId: spy.playerId, turnsLeft: spy.turnsLeft - 1 }));
    }
  }

  static applyActionEffects(game: GameState, playerId: string, playedCard: TCard, targetPlayerId?: string) {
    (playedCard.effects as ActionEffect[]).map((actionEffect) => {
      switch (actionEffect.actionType) {
        case "singleTarget":
          if (!targetPlayerId) return;

          // if card is spy
          if (playedCard.template.id === "spy") {
            game.players[playerId].empire.spyingQueue.push({
              playerId: targetPlayerId,
              turnsLeft: (playedCard.effects as ActionEffectProps[]).map((effect) => effect.turnsToSpy)[0]!,
            });
            break;
          }
          if (actionEffect.impactType === "negative") {
            game.players[targetPlayerId].empire.health -=
              gameConfig.baseDamage +
              GameActionsStore.getBonusOrMalusDamageByEffect(actionEffect, game, playerId, targetPlayerId);
            break;
          }
          if (actionEffect.impactType === "positive") {
            game.players[playerId].empire.health =
              game.players[playerId].empire.health + actionEffect.impact! >= gameConfig.health
                ? gameConfig.health
                : game.players[playerId].empire.health + actionEffect.impact!;
            break;
          }
          break;
        case "everyTarget":
          // if card is spyAll
          if (playedCard.template.id === "spyAll") {
            Object.keys(game.players).map((targetPlayerId) => {
              if (targetPlayerId !== playerId) {
                game.players[playerId].empire.spyingQueue.push({
                  playerId: targetPlayerId,
                  turnsLeft: (playedCard.effects as ActionEffectProps[]).map((effect) => effect.turnsToSpy)[0]!,
                });
              }
            });
            break;
          }

          Object.keys(game.players).map((targetPlayerId) => {
            if (playerId === targetPlayerId) return;
            game.players[targetPlayerId].empire.health -=
              gameConfig.baseDamage +
              GameActionsStore.getBonusOrMalusDamageByEffect(actionEffect, game, playerId, targetPlayerId);
          });
          break;
      }
    });
  }

  static getBonusOrMalusDamageByEffect(
    effect: ActionEffect,
    game: GameState,
    playerId: string,
    targetPlayerId: string,
  ) {
    if (!effect.domain) return 0;
    let myRace: TRACE = "NONE";
    let enemyRace: TRACE = "NONE";

    const playerBuildingsT1 = getBuildingsPlayerByDomainAndByTier(
      game.players[playerId].empire.buildings,
      effect.domain,
      1,
    );
    const targetPlayerBuildingsT1 = getBuildingsPlayerByDomainAndByTier(
      game.players[targetPlayerId].empire.buildings,
      effect.domain,
      1,
    );

    if (playerBuildingsT1.length) {
      myRace = "NEUTRAL";
    }

    if (targetPlayerBuildingsT1.length) {
      myRace = "NEUTRAL";
    }

    const playerBuildingsT2 = getBuildingsPlayerByDomainAndByTier(
      game.players[playerId].empire.buildings,
      effect.domain,
      2,
    );

    const targetPlayerBuildingsT2 = getBuildingsPlayerByDomainAndByTier(
      game.players[targetPlayerId].empire.buildings,
      effect.domain,
      2,
    );

    if (playerBuildingsT2.length) {
      myRace = cardDictionnary[first(playerBuildingsT2)!].template.race!;
    }

    if (targetPlayerBuildingsT2.length) {
      enemyRace = cardDictionnary[first(targetPlayerBuildingsT2)!].template.race!;
    }

    console.info(
      effect.domain,
      playerBuildingsT1,
      playerBuildingsT2,
      myRace,
      enemyRace,
      BONUMALUS_DAMAGE[myRace][enemyRace],
    );
    return BONUMALUS_DAMAGE[myRace][enemyRace];
  }
}
