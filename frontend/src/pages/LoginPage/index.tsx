import React, { useState } from 'react';

import styles from './styles.module.css';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { applicationStore } from 'application/store';
import { observer } from 'mobx-react';
import { useObserveSuccess } from 'helpers';
import { useHistory } from 'react-router';

export const LoginPage = observer(() => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const { replace } = useHistory();

  useObserveSuccess(applicationStore.loginPromise, () => replace('/'));

  function handleClick() {
    applicationStore.login(email, password);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.title}>Войти</span>
        <Input label="пользователь" value={email} onChange={setEmail} />
        <Input label="пароль" type="password" value={password} onChange={setPassword} />
        <Button
          onClick={handleClick}
          label="Войти"
          disabled={!email || !password}
          loading={applicationStore?.loginPromise?.pending}
        />
      </div>
    </div>
  );
});
