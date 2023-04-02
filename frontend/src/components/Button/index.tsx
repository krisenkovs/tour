import styles from './styles.module.css';
import { Loader } from 'components/Loader';
import React, { CSSProperties, FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  label?: string | React.ReactElement;
  onClick: (e?: any) => void;
  disabled?: boolean;
  loading?: boolean;
}>;

export const Button: FC<Props> = ({ onClick, label,  disabled, loading = false }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${disabled ? styles.disabled : ''} ${loading ? styles.loading : ''}`}
    >
      {loading ? <Loader /> : label}
    </button>
  );
};
