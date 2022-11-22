import styles from '../styles/Home.module.css';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import Image from 'next/image';
import LeetCodeStat from './leetcodestat';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

function SubcardCard(props) {

    let body;
    let add;
    if (props?.body) {
        const {type, items, addition } = props.body;
        const additionData = props?.addition;
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

        body = (type === 'list-horizontal' || type === 'list-list') ? <ul className={styles[type]}>{body}</ul> : <div>{body}</div>;
        
        if ( addition === 'leetcodestat' ) {
            let addCol = "...Loading";
            if ( additionData?.name === 'leetcodestat' ) {
                const data = additionData?.data?.data?.filter( item => item.name !== "All");
                addCol = <LeetCodeStat data={data} />
            }
            add = <div>
                <h4 style={{textAlign: 'center'}}>Leetcode stats</h4>
                {addCol}
            </div>
        }
    }

    return (
        <div className={styles.subcard}>
            <div className={styles.withAddition}>
                <div>
                    <p>{props?.title}</p>
                    {props?.description ? <span>{props?.description}</span> : ''}
                    {props?.subdescription ? <small><span>{props?.subdescription}</span></small> : ''}
                    {body}
                    {props?.children}
                </div>
                <div>
                    {add}
                </div>
            </div>
        </div>
    );
}

export default React.memo(SubcardCard)