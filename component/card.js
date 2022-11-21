import styles from '../styles/Home.module.css';
import { useInView } from 'react-intersection-observer';

export default function Card(props) {
    const { ref, inView } = useInView({
        /* Optional options */
        rootMargin: '0px',
        threshold: [0, 1.0],
    });

    return (
        <div className={styles.card} ref={ref}>
            <h2 className={inView ? styles.sticky : ''}>{props.title}</h2>            
            <div className={styles.cardBody}>
                {props?.children}
            </div>
        </div>
        
    );
}