import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';
import { store } from './store';
import { observer } from 'mobx-react';
import { useObserveError, useObserveSuccess } from 'helpers';

export const OrderDialog = observer(() => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (store.visible) {
      form.setFieldsValue({ tour: store.data });
    }
    return () => form.resetFields();
  }, [store.visible]);

  useObserveSuccess(store.savePromise, () => {
    store.close();
  });
  useObserveError(store.savePromise);

  function handleFinish() {
    form.validateFields().then((values) => {
      store.create(values);
      store.close();
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
      title="Заказ"
      okText="Оставить заявку"
      cancelText="Отмена"
      onOk={handleFinish}
      width={400}
      onCancel={handleCancel}
      okButtonProps={{ loading: store.savePromise?.pending }}
      cancelButtonProps={{ disabled: store.savePromise?.pending }}
    >
      <Form form={form} layout="vertical" initialValues={{ remember: true }} autoComplete="off">
        <Form.Item name={['tour', 'id']} hidden />
        <Form.Item
          label="Количество человек"
          name="mens"
          rules={[{ required: true, message: 'Укажите количество' }]}
          initialValue={1}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Номер телефона" name="phone" rules={[{ required: true, message: 'Укажите телефон' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Комментарий" name="comment">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
});
