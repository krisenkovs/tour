import React from 'react';
import styles from './styles.module.css';

export const Header = () => {
  return (
    <div className={styles.container}>
      <span className={styles.logo}>Лучшее турагенство</span>
      <div className={styles.flex} />
      <a href="tel:+375291234569" className={styles.link}>
        +375 (29) 123-45-69
      </a>
    </div>
  );
};
