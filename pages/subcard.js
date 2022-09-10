import styles from '../styles/Home.module.css';

export default function SubcardCard(props) {
    return (
        <div className={styles.subcard}>
            <p>{props?.title}</p>
            {props?.description ? <span>{props?.description}</span> : ''}
            {props?.subdescription ? <small><span>{props?.subdescription}</span></small> : ''}
            {props?.children}
        </div>
    );
}