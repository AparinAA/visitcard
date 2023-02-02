import React from 'react';
import styles from '../styles/Home.module.css';

function HiddenBlock({ width, height }) {
    return (
        <div
            className={styles.hiddenBlock}
            style={{ width, height }}
        />
    );
}

export default HiddenBlock;