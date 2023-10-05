import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import axios from 'axios';

const { Dragger } = Upload;

export default function UploadFile() {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleBeforeUpload = (file) => {
    setFileList([...fileList, file]);
    return false;
  };

  const handleChangeFiles = ({ fileList }) => {
    setFileList([...fileList]);
  };

  const handleUploadFiles = () => {
    if (fileList) {
      var formData = new FormData();

      fileList.forEach((file) => {
        formData.append('files', new Blob([file]), file.name);
      });
      setUploading(true);

      axios
        .post('http://localhost:8080/student/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          setFileList([]);
          message.success('upload successfully.');
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setUploading(false);
        });
    }
  };

  const handleRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  console.log(fileList);
  return (
    <>
      <Dragger
        {...{
          fileList,
          accept: '.xls, .xlsx',
          onRemove: handleRemove,
          beforeUpload: handleBeforeUpload,
          multiple: true,
          onChange: handleChangeFiles,
        }}
      >
        <p className="ant-upload-drag-icon">upload file</p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
      </Dragger>
      <Button loading={uploading} type="primary" disabled={fileList.length === 0} onClick={handleUploadFiles} style={{ marginTop: 16 }}>
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
}
