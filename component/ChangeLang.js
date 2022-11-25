import React from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

function ChangeLang({props}) {
    const {prefix, inView, setLang, lang} = props;
    return (
        <div className={`${!inView ? styles.sticky : ''} ${styles.langMenu}`} style={{"zIndex": "100"}}>
            
            <input 
                type="radio"
                name="langRadio"
                className={styles.buttonLang}
                onChange={(e) => setLang(e.target.value)}
                value="EN"
                id="buttonEN"
                checked={lang==="EN"}
            />
            <label htmlFor='buttonEN' className={styles.labelButtonLang}>
                <Image src={`${prefix}/enflag.svg`} width={30} height={15}/>
            </label>
            
            <input 
                type="radio"
                name="langRadio"
                className={`${styles.buttonLang} ${styles.ru}`}
                onChange={(e) => setLang(e.target.value)} 
                value="RU"
                id="buttonRU"
                checked={lang==="RU"}
            />
            <label htmlFor='buttonRU' className={styles.labelButtonLang}>
                <Image src={`${prefix}/ruflag.svg`} width={30} height={15}/>
            </label>
        </div>
    );
}

export default React.memo(ChangeLang);