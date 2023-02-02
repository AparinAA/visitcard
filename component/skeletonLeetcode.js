import React from 'react';
import styles from '../styles/Home.module.css';
import HiddenBlock from './HiddenBlock';

function SkeletonLeetcode() {
    return (
        <div className={styles.skeletonLeetcode}>
            <ul style={{ 'alignSelf': 'center' }}>
                <li>
                    <HiddenBlock width={70} height={15} />
                </li>
                <li>
                    <HiddenBlock width={70} height={15} />
                </li>
                <li>
                    <HiddenBlock width={70} height={15} />
                </li>
            </ul>
            <div>
                <HiddenBlock width={140} height={140} />
            </div>
        </div>
    );
}

export default SkeletonLeetcode;