import { observer } from 'mobx-react';
import React from 'react';
import { Footer } from 'application/Footer';
import { Header } from 'application/Header';
import { Redirect, Route, Switch } from 'react-router';
import { TourPage } from 'pages/TourPage';
import { LoginDialog } from 'application/LoginDialog';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { CountriesPage } from 'pages/Admin/CountriesPage';
import { useObserveError, useObserveSuccess } from 'helpers';
import { applicationStore } from 'application/store';
import { HotelsPage } from 'pages/Admin/HotelsPage';
import { ToursPage } from 'pages/Admin/ToursPage';
import {OrdersPage} from "pages/Admin/OrdersPage";

export const Application = observer(() => {
  useObserveSuccess(applicationStore.logoutPromise, () => {
    console.log('reaction');
    applicationStore.setLoginToken('');
  });
  useObserveError(applicationStore.logoutPromise);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        <Header />
        <div style={{ flex: 1, flexDirection: 'column', overflow: 'auto', display: 'flex' }}>
          <Switch>
            <Route path="/tours" component={TourPage} />
            <Route path="/hot" render={() => <TourPage hot />} />
            <ProtectedRoute path="/admin-countries" component={CountriesPage} />
            <ProtectedRoute path="/admin-hotels" component={HotelsPage} />
            <ProtectedRoute path="/admin-tours" component={ToursPage} />
						<ProtectedRoute path="/admin-orders" component={OrdersPage} />
            <Redirect to="/tours" />
          </Switch>
          <Footer />
        </div>
      </div>
      <LoginDialog />
    </>
  );
});
