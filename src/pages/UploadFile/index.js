import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import axios from 'axios';
import aixosClient from '../../api/aixosClient';

const { Dragger } = Upload;

const UploadFile = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = () => {
    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append('files', file.originFileObj);
    });

    setUploading(true);

    // You can use any AJAX library you like
    aixosClient
      .post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setFileList([]);
        message.success('Nhập dữ liệu thành công!');
      })
      .catch(() => {
        message.error('Đã có lỗi');
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    accept: '.xls, .xlsx',
    onChange: ({ fileList }) => {
      setFileList([...fileList]);
    },
    multiple: true,
    fileList,
  };
  return (
    <>
      <Dragger {...props}>
        <Button icon={<UploadOutlined />}>Chọn file</Button>
        <p className="ant-upload-text">Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
        <p className="ant-upload-hint">Hỗ trợ tải lên một file hoặc hàng loạt</p>
      </Dragger>
      <Button
        size="large"
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? 'Uploading' : 'Nhập dữ liệu'}
      </Button>
    </>
  );
};
export default UploadFile;
