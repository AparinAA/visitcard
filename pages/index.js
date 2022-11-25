import { useInView } from 'react-intersection-observer';
import React, { useState, useEffect, memo, useReducer } from 'react';

import Head from 'next/head';
//import Script from 'next/script';
import styles from '../styles/Home.module.css';
import Card from '../component/card';
import SubcardCard from '../component/subcard';
import ChangeLang from '../component/ChangeLang';

import { readData } from '../data/read';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

let initLang = "RU";

function reducer (state, action) {
    return action;
}

function Home ({data}) {
    const num = 100;
    const rate = 1 / (num + 1);

    const [ref, inView, entry] = useInView({
        /* Optional options */
        root: null,
        rootMargin: '100px',
        threshold: [...Array(num).keys()].map( index => (index + 1) * rate),
    });

    const [lang, setLang] = useReducer(reducer, initLang);
    const listCard = data[lang];
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
            
            <main className={styles.main} id="main" style={{"opacity":  1 - 1.2 * ratio * ratio }}>
                <ChangeLang props={{prefix, inView, setLang, lang}}/>

                <div className={styles.grid}>
                    <div className={styles.info} id="info">
                        {listCard?.map( item => (
                            <Card title={item?.title} key={`card_${item.id}`}>
                                {item.info.map( infItem => {
                                    return <SubcardCard 
                                        key={`subcard_${item.id}_${infItem?.id}`}
                                        title={infItem?.title}
                                        description={infItem?.description}
                                        subdescription={infItem?.subdescription}
                                        body={infItem?.child}
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
        props: {data}
    }
}