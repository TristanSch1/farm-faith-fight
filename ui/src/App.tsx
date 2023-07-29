import React, { useRef } from 'react'
import { SceneContainer } from './layouts'

import './assets/styles/normalize.css';
import './assets/styles/app.css';
import {
  CardDrawable,
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

function App() {
  const cardRef = useRef();
  return (
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
        <CardDrawable ref={cardRef}>
          <Card />
        </CardDrawable>
      </CardDrawPile>

      {/* <div style={{}}>
        <button onClick={() => cardRef.current!.turnCard()}>
          Turn card
        </button>
      </div> */}

    </SceneContainer>
  )
}

export default App
