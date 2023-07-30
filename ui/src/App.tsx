import React from 'react'
import { SceneContainer } from './layouts'

import './assets/styles/normalize.css';
import './assets/styles/app.css';
import {
  CardDrawPile,
  Card,
  EmpireAvatar,
  EmpireStatus,
  EmpiresHeader,
  EconomyHeader,
  EconomyItem,
} from './components';

const App = () => (
  <SceneContainer>
    <EmpiresHeader>

      <EmpireStatus fill={80}>
        <EmpireAvatar race_name='elf' />
      </EmpireStatus>

      <EmpireStatus fill={20}>
        <EmpireAvatar race_name='orc' />
      </EmpireStatus>

      <EmpireStatus fill={60}>
        <EmpireAvatar race_name='human' />
      </EmpireStatus>

      <EmpireStatus fill={66}>
        <EmpireAvatar race_name='undead' />
      </EmpireStatus>

    </EmpiresHeader>

    <EconomyHeader>
      <EconomyItem fill={35} type='FOOD' />
      <EconomyItem fill={50} type='WOOD' />
    </EconomyHeader>

    <CardDrawPile>
      <Card
        domain='religion'
        image_path='building/spiritualPlace'
        tier={1}
        title='Lieu spirituel'
        description='Découvrez le Cercle Spirituel, un humble lieu de sanctuaire en pleine plaine, entouré de la sérénité de la forêt environnante. Les piliers de terre et de pierre dressés ici accueillent les païens démunis mais ardents, qui viennent y accomplir leurs rituels avec ferveur. Ce lieu sacré transcende les races, accueillant tous ceux qui cherchent la paix intérieure.'
        target="Kevin"
      />
    </CardDrawPile>
  </SceneContainer>
)

export default App
