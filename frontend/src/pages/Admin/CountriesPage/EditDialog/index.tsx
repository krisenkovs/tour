import React, { useEffect } from 'react';
import { Form, Input, Modal, Switch } from 'antd';
import { store } from './store';
import { store as tableStore } from '../store';
import { observer } from 'mobx-react';
import { useObserveError, useObserveSuccess } from 'helpers';

export const EditDialog = observer(() => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (store.visible) {
      form.setFieldsValue(store.data);
    }
    return () => form.resetFields();
  }, [store.visible]);

  useObserveSuccess(store.savePromise, () => {
    store.close();
    tableStore.load();
  });
  useObserveError(store.savePromise);

  function handleFinish() {
    form.validateFields().then(() => {
      const values = form.getFieldsValue(true);
      console.log(values, values?.id);
      if (values?.id) {
        console.log('save');
        store.save(values);
      } else {
        console.log('create');
        store.create(values);
      }
    });
  }
  function handleCancel() {
    store.close();
  }
  return (
    <Modal
      centered
      maskClosable={false}
      open={store.visible}
      forceRender
      title={store.data ? 'Редактирование' : 'Добавление'}
      okText="Сохранить"
      cancelText="Отмена"
      onOk={handleFinish}
      width={400}
      onCancel={handleCancel}
      okButtonProps={{ loading: store.savePromise?.pending }}
      cancelButtonProps={{ disabled: store.savePromise?.pending }}
    >
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item
          label="Наименование"
          name="name"
          rules={[{ required: true, message: 'Укажите наименование' }]}
          style={{ width: '100%' }}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Признак активности" name="active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
});
