import styles from '../styles/Home.module.css';

export default function SubcardCard(props) {
    return (
        <div className={styles.subcard}>
            {props.children}
        </div>
    );
}