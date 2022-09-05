import styles from '../styles/Home.module.css';
import { useInView } from 'react-intersection-observer';

export default function Card(props) {
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: [0, 1.0],
    });

    return (
        <div className={styles.card} ref={ref}>
            <h2 className={inView ? styles.sticky : ''}>{props.title}</h2>
            
            {props.children}
            <hr style={{opacity: "0.3", padding: "0", margin: "5px 0 0 0"}}/>
        </div>
        
    );
}