import styles from '../styles/Home.module.css';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import Image from 'next/image';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function SubcardCard(props) {
    let body;
    if (props?.body) {
        const {type, items} = props.body;
        
        
        body = items.map( item => {
            if (type === 'list-link' || type === 'list-link-horizontal') {
                const img = item?.ico ? <Image src={ `${prefix}/${item?.ico}.svg`} width={16} height={16}/> : '';

                return <a 
                        key={`list-link-${item.id}`}
                        className={`${styles[type]}`}
                        rel="noreferrer" href={item.url}
                        target="_blank">
                            {img}
                            <ReactMarkdown components={{p: React.Fragment}}>{item.name}</ReactMarkdown>
                        </a>
            }
            if (type === 'list-horizontal' || type === 'list-list') {
                return <li key={`list-hor-${item}`}><ReactMarkdown components={{p: React.Fragment}}>{item}</ReactMarkdown></li>
            }

            return <ReactMarkdown key={item}>{item}</ReactMarkdown>;
        });

        body = (type === 'list-horizontal' || type === 'list-list') ? <ul className={styles[type]}>{body}</ul> : <>{body}</>;
    }
    return (
        <div className={styles.subcard}>
            <p>{props?.title}</p>
            {props?.description ? <span>{props?.description}</span> : ''}
            {props?.subdescription ? <small><span>{props?.subdescription}</span></small> : ''}
            {body}
            {props?.children}
        </div>
    );
}