import styles from '../styles/Home.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React from 'react';

export default function SubcardCard(props) {
    let body;
    if (props?.body) {
        const {type, items} = props.body;
        
        body = items.map( item => {
            if (type === 'list-link' || type === 'list-link-horizontal') {
                return <a 
                        key={`list-link-${item.id}`}
                        className={`${item?.ico ? styles[item.ico] : ''} ${styles[type]}`}
                        rel="noreferrer" href={item.url}
                        target="_blank">
                            <ReactMarkdown children={item.name} components={{p: React.Fragment}}/>
                        </a>
            }
            if (type === 'list-horizontal' || type === 'list-list') {
                return <li key={`list-hor-${item}`}><ReactMarkdown children={item} components={{p: React.Fragment}}/></li>
            }

            return <ReactMarkdown key={item} children={item} />;
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