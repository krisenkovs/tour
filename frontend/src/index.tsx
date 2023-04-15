import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from 'application';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'index.css';
import { ConfigProvider } from 'antd';
import ru from 'antd/es/locale/ru_RU';

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider renderEmpty={() => null} locale={ru}>
      <Application />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
