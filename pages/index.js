import { useInView } from 'react-intersection-observer';
import React, { useState, useEffect, memo } from 'react';

import Head from 'next/head';
//import Script from 'next/script';
import styles from '../styles/Home.module.css';
import Card from '../component/card';
import SubcardCard from '../component/subcard';
import { readData } from '../data/read';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

function Home ({listCard}) {
    const num = 100;
    const rate = 1 / (num + 1);

    let [ addition, setAddition ] = useState([]);

    useEffect( () => {
        fetch('api/leetcodequery', { method: "GET" })
        .then(res => res.json())
        .then(d => setAddition({"name": "leetcodestat", "data": d}))
        .catch( e => console.info("E", e));
    }, []);
    
    const [ref, inView, entry] = useInView({
        /* Optional options */
        root: null,
        rootMargin: '100px',
        threshold: [...Array(num).keys()].map( index => (index + 1) * rate),
    });

    const ratio = entry?.intersectionRatio ?? 1;
    return (
        <div className={styles.container} id="body">
            <Head>
                <title>Visit card</title>
                <meta name="description" content="" />
                <link rel="icon" href={`${prefix}/aa.ico`} />
            </Head>
            
            <div 
                className={styles.title}
                id="title"
                ref={ref}
                style={{'opacity' : ratio * ratio * ratio * ratio * ratio * ratio * ratio * ratio - 0.1, backgroundImage : `url(${prefix}/welcomtextMini.svg)`}}
            />
            
            <main className={styles.main} id="main" >
                <div className={styles.grid}>
                    <div className={styles.info} id="info" style={{"opacity":  1 - 1.2 * ratio * ratio }}>
                        {listCard?.map( item => (
                            <Card title={item?.title} key={`card_${item.id}`}>
                                {item.info.map( infItem => {
                                    return <SubcardCard 
                                        key={`subcard_${item.id}_${infItem?.id}`}
                                        title={infItem?.title}
                                        description={infItem?.description}
                                        subdescription={infItem?.subdescription}
                                        body={infItem?.child}
                                        addition={infItem?.child?.addition ? addition : undefined}
                                    />
                                })}
                                {item?.child}
                            </Card>
                        ))}
                    </div>
                    
                </div>
                <footer className={styles.footer}>
                    Powered by{' '} Aparin Aleksandr
                </footer>
            </main>

        </div>
    )
}

export default React.memo(Home);

export async function getStaticProps() {
    const data = readData(prefix);
    return {
        props: {
            listCard: data
        }
    }
}