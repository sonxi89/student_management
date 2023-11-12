import React from 'react';
import { Button, Result } from 'antd';
import { Navigate } from 'react-router-dom';

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" href="/home">
          Back Home
        </Button>
      }
    />
  );
}

export default NotFound;
