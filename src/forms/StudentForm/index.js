import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Select, message } from 'antd';
import dayjs from 'dayjs';
import userApi from '../../api/userApi';

const { Option } = Select;

function StudentForm({ data, onClose, updateDataAfterSave }) {
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      student_position: fieldsValue['student_position'] === '1' ? '1' : null,
      student_dob: fieldsValue['student_dob'].format('YYYY-MM-DD'),
    };
    console.log('Received values of form: ', values);

    userApi
      .updateStudent(data.id, values)
      .then((res) => {
        message.success(res.message);
        updateDataAfterSave();
        onClose();
      })
      .catch((err) => {
        console.log(err);
        onClose();
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      layout="vertical"
      name="basic"
      labelCol={{
        span: 8,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Mã sinh viên"
        name="student_code"
        initialValue={data.student_code}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Họ tên"
        name="student_name"
        initialValue={data.student_name}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="student_dob"
        label="Ngày sinh"
        rules={[
          {
            type: 'object',
            required: true,
            message: 'Please select time!',
          },
        ]}
        initialValue={dayjs(data.student_dob)}
      >
        <DatePicker
          style={{
            width: '100%',
          }}
        />
      </Form.Item>
      <Form.Item
        label="Lớp"
        name="class_name"
        initialValue={data.class_name}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Ngành"
        name="majors_name"
        initialValue={data.majors_name}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Khoa"
        name="faculty_name"
        initialValue={data.faculty_name}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="student_position"
        label="Chức vụ"
        rules={[
          {
            required: true,
            message: 'Please select your country!',
          },
        ]}
        initialValue={data.student_position}
      >
        <Select placeholder="Please select a country">
          <Option value="1">Cán bộ lớp</Option>
          <Option value="0">Thành viên</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
        <Button onClick={() => onClose()}>Hủy</Button>
      </Form.Item>
    </Form>
  );
}

export default StudentForm;
