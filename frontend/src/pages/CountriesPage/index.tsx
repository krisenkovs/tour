import React, { useEffect } from 'react';

import styles from './styles.module.css';
import { observer } from 'mobx-react';
import { store } from './store';
import { Loader } from 'components/Loader';

export const CountriesPage = observer(() => {
  const { countriesPromise, loadActiveCountries, destroy } = store;

  useEffect(() => {
    loadActiveCountries();
    return destroy;
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Направления</span>
      {countriesPromise?.pending && <Loader />}
      {countriesPromise?.value?.map((country) => (
        <div key={country?.id} className={styles.item}>
          <span className={styles?.itemTitle}>{country?.name}</span>
          <img src={country?.image} alt={country?.name} className={styles.itemImage} />
          <span className={styles.itemDescription}>{country?.description}</span>
        </div>
      ))}
    </div>
  );
});
