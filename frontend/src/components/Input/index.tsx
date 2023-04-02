import React from 'react';

import styles from './styles.module.css';

type Props = {
  value?: string;
  type?: 'text' | 'password';
  onChange?: (value?: string) => void;
  label?: string;
};

export function Input({ label, value, onChange, type }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} type={type} value={value} onChange={({ target }) => onChange?.(target?.value)} />
    </div>
  );
}
