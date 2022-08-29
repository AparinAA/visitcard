import styles from '../styles/Home.module.css';

export default function Card(props) {
    return (
        <div className={styles.card}>
            <h2>{props.title}</h2>
            {props.children}
            <hr style={{opacity: "0.3", padding: "0", margin: "5px 0 0 0"}}/>
        </div>
        
    );
}