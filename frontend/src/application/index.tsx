import { applicationStore } from 'application/store';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './styles.module.css';
import { Header } from 'application/components/Header';
import { Menu } from 'application/components/Menu';
import { Footer } from 'application/components/Footer';
import { Redirect, Route, Switch } from 'react-router';
import { LoginPage } from 'pages/LoginPage';
import { CountriesPage } from 'pages/CountriesPage';

export const Application = observer(() => {
  return (
    <div className={styles.container}>
      <Header />
      <Menu />
      <div className={styles.content}>
        <Switch>
          {!applicationStore?.isLogin && <Route path="/admin" component={LoginPage} />}
          <Route path="/countries" component={CountriesPage} />
          <Redirect to="/" />
        </Switch>
      </div>
      <Footer />
    </div>
  );
});
