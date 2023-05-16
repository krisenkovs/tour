import React from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export function DateInput({ value, onChange }: Props) {
  function handleChange(value: Moment | null) {
    onChange?.(value ? value.format('YYYY-MM-DD') : '');
  }

  return (
    <>
      <DatePicker
        style={{ width: '100%' }}
        format={'DD.MM.YYYY'}
        value={value ? moment(value) : undefined}
        onChange={handleChange}
      />
    </>
  );
}
