import styles from '../styles/Home.module.css';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import LeetCodeStat from './leetcodestat';
import ListLink from './subcardtypes/ListLink';
import ListItemHorizontal from './subcardtypes/ListItemHorizontal';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

function SubcardCard(props) {
    let body;

    const { type, items, addition } = props?.body ?? { type: '', items: '', addition: '' };

    if (props?.body) {
        items.sort((a, b) => a?.id && b?.id ? a?.id - b?.id : 1);
        body = items.map((item, index) => {
            if (type === 'list-link' || type === 'list-link-horizontal') {
                return <ListLink key={`list-link-${item.id}`} data={{ prefix, type, item }} />
            }
            if (type === 'list-horizontal' || type === 'list-list') {
                const typedef = typeof item;
                if (typedef === 'object') {
                    return <ListItemHorizontal key={`list-hor-${index}`} item={item} />
                } else if (['string', 'number', 'boolean'].includes(typedef)) {
                    return <li key={`list-hor-${index}`}><ReactMarkdown components={{ p: React.Fragment }}>{item}</ReactMarkdown></li>
                }
            }

            return <ReactMarkdown key={index}>{item}</ReactMarkdown>;
        });

        body = (type === 'list-horizontal' || type === 'list-list') ? <ul className={styles[type]}>{body}</ul> : <div>{body}</div>;

    }

    const main = <div>
        <ReactMarkdown>{props?.title}</ReactMarkdown>
        {props?.description ? <span>{props?.description}</span> : ''}
        {props?.subdescription ? <small><span>{props?.subdescription}</span></small> : ''}
        {body}
        {props?.children}
    </div>;

    addition === 'leetcodestat';

    return (
        <div className={styles.subcard}>

            {addition ?
                <div className={`${styles.withAddition}`}>
                    {main}
                    {addition === 'leetcodestat' && <div>
                        <h4 style={{ textAlign: 'center' }}>Leetcode stats</h4>
                        <LeetCodeStat />
                    </div>
                    }
                </div>
                : main
            }
        </div>
    );
}

export default React.memo(SubcardCard)