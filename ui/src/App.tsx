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

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import elfAvatarUrl from './assets/images/avatar/elf.png';
// @ts-ignore
import orcAvatarUrl from './assets/images/avatar/orc.png';
// @ts-ignore
import humanAvatarUrl from './assets/images/avatar/human.png';
// @ts-ignore
import undeadAvatarUrl from './assets/images/avatar/undead.png';

const App = () => (
  <SceneContainer>
    <EmpiresHeader>

      <EmpireStatus fill={80}>
        <EmpireAvatar imageUrl={elfAvatarUrl} />
      </EmpireStatus>

      <EmpireStatus fill={20}>
        <EmpireAvatar imageUrl={orcAvatarUrl} />
      </EmpireStatus>

      <EmpireStatus fill={60}>
        <EmpireAvatar imageUrl={humanAvatarUrl} />
      </EmpireStatus>

      <EmpireStatus fill={66}>
        <EmpireAvatar imageUrl={undeadAvatarUrl} />
      </EmpireStatus>

    </EmpiresHeader>

    <EconomyHeader>
      <EconomyItem fill={35} type='FOOD' />
      <EconomyItem fill={50} type='WOOD' />
    </EconomyHeader>

    <CardDrawPile>
      <Card color='blue' />
      <Card color='green' />
      <Card color='yellow' />
      <Card color='pink' />
      <Card color='orange' />
    </CardDrawPile>
  </SceneContainer>
)

export default App
