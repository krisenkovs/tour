import React, { useEffect } from 'react';
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Form,
  InputNumber,
  Rate,
  Row,
  Select,
  Space,
  Statistic,
  Typography,
} from 'antd';
import { OrderDialog } from 'pages/TourPage/OrderDialog';
import { store as orderDialogStore } from 'pages/TourPage/OrderDialog/store';
import { observer } from 'mobx-react';
import { store } from 'pages/TourPage/store';
import { DateInput } from 'pages/TourPage/DateInput';

type Props = {
  hot?: boolean;
};

export const TourPage = observer(({ hot }: Props) => {
  const [form] = Form.useForm();

  const { loadCountries, countriesPromise, toursPromise, findTours, clear } = store;

  useEffect(() => {
    form.setFieldsValue({ hot });
    findTours(form.getFieldsValue());
    loadCountries();
    return clear;
  }, [hot]);

  function handleFind() {
    findTours(form.getFieldsValue());
  }

  return (
    <>
      <div style={{ flex: 1, flexDirection: 'column', padding: '16px' }}>
        <Typography.Title level={2}>{hot ? 'Горящие путевки' : 'Подбор тура'}</Typography.Title>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Form layout="inline" form={form}>
              <Form.Item name={['hot']} hidden />
              <Form.Item name={['countryId']} label="Куда">
                <Select
                  loading={countriesPromise?.pending}
                  options={countriesPromise?.value
                    ?.filter((item) => item?.active)
                    ?.map((item) => ({
                      key: item?.id,
                      label: item?.name,
                      value: item?.id,
                    }))}
                  style={{ width: '100px' }}
                />
              </Form.Item>
              <Form.Item name="date" label="Дата">
                <DateInput />
              </Form.Item>
              <Form.Item name="days" label="Количество ночей" initialValue={7}>
                <InputNumber min={1} max={30} step={1} precision={0} style={{ width: '70px' }} disabled />
              </Form.Item>
              <Form.Item name="mens" label="Количество взрослых" initialValue={1}>
                <InputNumber min={1} max={10} step={1} precision={0} style={{ width: '70px' }} />
              </Form.Item>

              <Button type="primary" onClick={handleFind} loading={toursPromise?.pending}>
                Подобрать
              </Button>
            </Form>
          </Col>
          {toursPromise?.value?.map((item) => (
            <Col span={24} key="key">
              <Divider style={{ marginBottom: '16px' }} />
              <Row gutter={16} wrap={false}>
                <Col>
                  <img
                    width={120}
                    height={180}
                    alt="logo"
                    style={{ height: '130px', width: '100px', display: 'block', objectFit: 'cover' }}
                    src={item?.hotel?.image}
                  />
                </Col>
                <Col flex={1}>
                  <Space direction="vertical" size={0}>
                    <Space align="baseline">
                      <Typography.Title level={4}>{item?.hotel?.name}</Typography.Title>
                      <Typography.Text>{item?.hotel?.country?.name}</Typography.Text>
                      <Rate value={item?.hotel?.rate} disabled />
                    </Space>

                    <Descriptions column={2}>
                      <Descriptions.Item label="Максимально человек">{item?.mens}</Descriptions.Item>
                    </Descriptions>
                  </Space>
                </Col>
                <Col>
                  <Space direction="vertical">
                    <Statistic title="Цена за ночь" value={item?.price} />
                    <Button type="primary" onClick={() => orderDialogStore.show(item)}>
                      Заказать
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </div>
      <OrderDialog />
    </>
  );
});
