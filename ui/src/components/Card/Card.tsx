import ReactDOMServer from 'react-dom/server'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './style.module.css';

import DomainIcon from '../Domain/DomainIcon';

type Props = {
    image_path: string,
    tier: number,
    title: string,
    description: string,
    target?: string,
    domain?: string,
    race?: string,
}

const Card: React.FC<Props> = ({ image_path, target, title, description, tier, domain, race }) => {

    const transformDescription = (text: string) => {
        const pseudoElement = <PlayerPseudo value={target?.toUpperCase() || ''} />;
        return text.replace('{target}', ReactDOMServer.renderToStaticMarkup(pseudoElement));
    }

    const renderDomainIcon: () => JSX.Element | undefined = () => {
        if (!domain) return;
        return <DomainIcon domain={domain} />
    }

    return (
        <div className={styles.card}>
            <div className={styles.card__inner}>
                <div className={styles.card__header}>
                    {renderDomainIcon()}
                </div>
                <img draggable={false} src={`/src/assets/images/card/${image_path}.png`} />
                <div className={styles.card__content}>
                    <span className={styles.card__content__title}>
                        {title} (Tier {tier})
                    </span>
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
