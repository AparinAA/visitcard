import React from 'react';
import styles from '../styles/Home.module.css';

function ChangeLang(props) {
    const {inView, changeLang, lang} = props;
    return (
        <div className={`${inView ? styles.sticky : ''} ${styles.langMenu}`} style={{"zIndex": "100"}}>
            
            <input 
                type="radio"
                name="langRadio"
                className={styles.buttonLang}
                onClick={(e) => changeLang(e.target.value)}
                value="EN"
                id="buttonEN"
                checked={lang==="EN"}
            />
            <label htmlFor='buttonEN' className={styles.labelButtonLang}>EN</label>
            
            <input 
                type="radio"
                name="langRadio"
                className={styles.buttonLang} 
                onClick={(e) => changeLang(e.target.value)} 
                value="RU"
                id="buttonRU"
                checked={lang==="RU"}
            />
            <label htmlFor='buttonRU' className={styles.labelButtonLang}>РУС</label>
        </div>
    );
}

export default React.memo(ChangeLang);