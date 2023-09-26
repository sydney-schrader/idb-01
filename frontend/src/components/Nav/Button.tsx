import React from 'react';
import styles from './Button.module.css';

interface Instance {
    title: string;
    //eventually add the link to the page somehow
}

function Button({title}: Instance){
    return(
        <button className={styles.button}>
            {title}
        </button>
    );
}

function Section({title}: Instance){
    return(
        <div className={styles.section}>
            <Button title={title}/>
        </div>);
}

export default Section;