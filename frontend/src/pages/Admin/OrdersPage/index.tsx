import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Button, Col, Row, Table, Tooltip, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { store } from './store';
import { useObserveError, useObserveSuccess } from 'helpers';
import moment from 'moment';

export const OrdersPage = observer(() => {
  useEffect(() => {
    store.load();
  }, []);

  useObserveSuccess(store.savePromise, () => {
    store.load();
  });
  useObserveError(store.savePromise);

  return (
    <>
      <div style={{ flex: 1, flexDirection: 'column', padding: '16px', display: 'flex' }}>
        <Row align="middle">
          <Col flex={1}>
            <Typography.Title level={2}>Заявки</Typography.Title>
          </Col>
        </Row>
        <Table
          size="small"
          rowKey="id"
          loading={store.itemsPromise?.pending}
          dataSource={store.itemsPromise?.value}
          showSorterTooltip={false}
          pagination={false}
          columns={[
            {
              title: 'id',
              dataIndex: 'id',
              key: 'id',
              defaultSortOrder: 'descend',
              width: 90,
            },
            {
              title: 'Страна',
              render: (value, record: any) => value?.tour?.hotel?.country?.name,
            },
            {
              title: 'Отель',
              render: (value, record: any) => value?.tour?.hotel?.name,
            },
            {
              title: 'Дата',
              render: (value, record: any) => moment(value?.tour?.date).format('DD.MM.YYYY'),
            },
            {
              title: 'Телефон',
              dataIndex: 'phone',
              key: 'phone',
            },
            {
              title: 'Комментарий',
              dataIndex: 'comment',
              key: 'comment',
            },
            {
              title: 'Обработан',
              key: 'check',
              width: 120,
              render: (value, record) => (record.check ? 'Да' : 'Нет'),
            },

            {
              key: 'actions',
              align: 'right',
              width: 90,
              render: (value, record) => (
                <Row justify="center" gutter={8}>
                  {!record.check && (
                    <Col>
                      <Tooltip title="Редактировать">
                        <Button
                          type="ghost"
                          size="small"
                          icon={<CheckOutlined />}
                          color=""
                          loading={store.savePromise?.pending}
                          onClick={() => store.check(record?.id)}
                        />
                      </Tooltip>
                    </Col>
                  )}
                </Row>
              ),
            },
          ]}
        />
      </div>
    </>
  );
});
