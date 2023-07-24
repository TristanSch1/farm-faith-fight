import React from 'react'
import { SceneContainer } from './layouts'

import './assets/styles/normalize.css';
import './assets/styles/app.css';
import { EmpireAvatar, EmpireStatus, EmpiresHeader } from './components';

function App() {
  return (
    <SceneContainer>
      <EmpiresHeader>

        <EmpireStatus health={80}>
          <EmpireAvatar />
        </EmpireStatus>

        <EmpireStatus health={20}>
          <EmpireAvatar />
        </EmpireStatus>

        <EmpireStatus health={60}>
          <EmpireAvatar />
        </EmpireStatus>

        <EmpireStatus health={66}>
          <EmpireAvatar />
        </EmpireStatus>

      </EmpiresHeader>
    </SceneContainer>
  )
}

export default App
