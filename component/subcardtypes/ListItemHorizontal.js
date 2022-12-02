import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../../styles/Home.module.css';
import Image from 'next/image';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

function ListItemHorizontal(props) {
    const { item } = props;
    const [ name = null, exp = 0 ] = [Object.keys(item)[0], Object.values(item)[0]];
    const lvl = [];

    for ( let i = 0; i < Math.min(exp,5); i++ ) {
        lvl.push(<div className={styles.bar} key={i}><Image src={`${prefix}/bar.png`} width={15} height={10}/></div>)
    }
    return (
        <li>
            <div className={styles.listHorNameItem}>
                <ReactMarkdown components={{p: React.Fragment}}>
                    {name}
                </ReactMarkdown>
            </div>
            <div className={styles.progressbar}>
                {lvl}
                <span>{exp > 5 ? '5+ years' : (exp > 1 ? `${exp} years` : `${exp} year`)}</span>
            </div>
            
        </li>
    );
}

export default ListItemHorizontal;