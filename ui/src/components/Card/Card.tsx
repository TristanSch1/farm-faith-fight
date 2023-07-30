import ReactDOMServer from 'react-dom/server'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

import DomainIcon from '../Icons/DomainIcon';
import RaceIcon from '../Icons/RaceIcon';

type Props = {
    type: string,
    tier: number,
    title: string,
    description: string,
    target?: string,
    domain?: string,
    race?: string,
    turnsToBuild?: number,
    buildLinks?: Array<{
        name: string,
        built: boolean
    }>
}

const Card: React.FC<Props> = ({ type, target, title, description, tier, domain, race, buildLinks, turnsToBuild }) => {

    buildLinks = buildLinks || [];

    const transformDescription = (text: string) => {
        const pseudoElement = <PlayerPseudo value={target?.toUpperCase() || ''} />;
        return text.replace('{target}', ReactDOMServer.renderToStaticMarkup(pseudoElement));
    }

    const renderDomainIcon: () => JSX.Element = () => {
        if (!domain) return <div></div>;
        return <DomainIcon domain={domain} />
    }

    const renderRaceIcon: () => JSX.Element = () => {
        if (!race) return <div></div>;
        return <RaceIcon race={race} />
    }

    const renderTimeToBuild: () => JSX.Element = () => {
        if (!turnsToBuild) return <div></div>;
        return <span className={styles.card__badge}>⏲ {turnsToBuild} Tours</span>;
    }

    const badgeStyle = (done: boolean) => (done ? { textDecoration: 'line-through', filter: 'grayscale(1)', opacity: .8 } : {})

    return (
        <div className={styles.card}>
            <div className={styles.card__inner}>
                <div className={styles.card__header}>
                    {renderDomainIcon()}
                    {renderRaceIcon()}
                </div>

                <div className={styles.left_section}>
                    {buildLinks.map(buildLink =>
                        <span style={badgeStyle(buildLink.built)} key={buildLink.name} className={styles.card__badge}>
                            {buildLink.name}
                        </span>
                    )}
                </div>

                <div className={styles.right_section}>
                    {renderTimeToBuild()}
                </div>

                <img draggable={false} src={`images/card/${type}.png`} />

                <div className={styles.card__content}>
                    <div className={styles.card__content__title}>
                        {title} {tier > 0 && `(Tier ${tier})`}
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: transformDescription(description) }} />
                </div>
            </div>
        </div>
    );
}

export default Card;

const PlayerPseudo: React.FC<{ value: string }> = ({ value: pseudo }) => {
    return <span style={{ color: '#ff902f', fontWeight: 'bold' }}>{pseudo}</span>;
}
