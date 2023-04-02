import React from 'react';
import styles from './styles.module.css';
import { Instagram } from 'icons/Instagram';
import { Twitter } from 'icons/Twitter';

export const Footer = () => {
  return (
    <div className={styles.container}>
      <span className={styles.logo}>ООО Лучшее турагенство</span>
      <div className={styles.flex} />
      <a href="https://instagram.com" className={styles.link}>
        <Instagram />
      </a>
      <a href="https://twitter.com" className={styles.link}>
        <Twitter />
      </a>
    </div>
  );
};
