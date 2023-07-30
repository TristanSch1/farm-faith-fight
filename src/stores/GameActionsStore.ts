import { TCard } from "../lib/Card.ts";
import { Empire } from "../lib/Empire.ts";
import { GameState } from "../lib/types/GameState.ts";
import gameConfig from "../game.config.ts";
import { cardDictionnary, TCardBuildingType } from "../lib/CardDictionnary.ts";
import { BuildingEffect } from "../lib/BuildingEffect.ts";
import { ActionEffect } from "../lib/ActionEffect.ts";
import eventsStore from "./EventsStore.ts";
import { IEventPlayCard, IEventThrowCard } from "../lib/types/EventTypes.ts";

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
    if (GameActionsStore.isCurrentCardBuildingCard(card)) {
      // card.effects;
    }
    return empire.food >= card.template.cost.food && empire.wood >= card.template.cost.wood;
  }

  static playCard(game: GameState, playerId: string, playedCard: TCard, randomPlayerIdTarget: string) {
    console.log(playedCard);
    GameActionsStore.readBuildingsQueue(game, playerId);
    GameActionsStore.applyEffects(game, playerId, playedCard, randomPlayerIdTarget);
    game.players[playerId].empire.food -= playedCard.template.cost.food;
    game.players[playerId].empire.wood -= playedCard.template.cost.wood;
    game.players[playerId].empire.turn += 1;
  }

  static throwCard(game: GameState, playerId: string) {
    GameActionsStore.readBuildingsQueue(game, playerId);
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
    console.log(playedCard.effects);

    if ((playedCard.effects as BuildingEffect).turnsToBuild) {
      GameActionsStore.applyBuildingEffect(game, playerId, playedCard);
    } else {
      GameActionsStore.applyActionEffects(game, playerId, playedCard, targetPlayerId);
    }
  }

  static applyBuildingEffect(game: GameState, playerId: string, playedCard: TCard) {
    game.players[playerId].empire.buildingsQueue.push({
      building: playedCard.template.id as TCardBuildingType,
      turnsLeft: (playedCard.effects as BuildingEffect).turnsToBuild,
    });
  }

  static readBuildingsQueue(game: GameState, playerId: string) {
    if (game.players[playerId].empire.buildingsQueue.length) {
      game.players[playerId].empire.buildingsQueue.map((building, index) => {
        if (!building.turnsLeft) {
          GameActionsStore.addBuildingsEffect(game, playerId, building.building);
          game.players[playerId].empire.buildingsQueue.splice(index, 1);
        }
        building.turnsLeft -= 1;
      });
    }
  }

  static addBuildingsEffect(game: GameState, playerId: string, building: TCardBuildingType) {
    game.players[playerId].empire.buildings.push(building);
  }

  static applyActionEffects(game: GameState, playerId: string, playedCard: TCard, targetPlayerId?: string) {
    (playedCard.effects as ActionEffect[]).map((actionEffect) => {
      switch (actionEffect.actionType) {
        case "singleTarget":
          break;
        case "everyTarget":
          break;
      }
    });
  }
}
