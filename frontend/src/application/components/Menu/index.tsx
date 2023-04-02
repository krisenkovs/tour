import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export const Menu = () => {
  return (
    <div className={styles.container}>
      <Link to="/countries" className={styles.link}>
        Направления
      </Link>
      <Link to="/tours" className={styles.link}>
        Подбор тура
      </Link>
      <Link to="/contacts" className={styles.link}>
        Контакты
      </Link>
    </div>
  );
};
