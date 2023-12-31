import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Select, message } from 'antd';
import userApi from '../../api/userApi';

const { Option } = Select;

function ScoreForm({ data, onClose, updateDataAfterSave }) {
  const [dataStudent, setDataStudents] = useState(data);
  console.log(dataStudent);

  const onFinish = (fieldsValue) => {
    userApi
      .updateScore(dataStudent.id, fieldsValue)
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
        initialValue={dataStudent.student_code}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        disabled
        label="Họ tên"
        name="student_name"
        initialValue={dataStudent.student_name}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="Lớp"
        name="class_name"
        initialValue={dataStudent.class_name}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="Năm học"
        name="year_code"
        initialValue={dataStudent.year_code}
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
        initialValue={dataStudent.majors_name}
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
        label="Khóa"
        name="faculty_name"
        initialValue={dataStudent.faculty_name}
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
        label="Điểm học phần"
        name="course_score_hk"
        initialValue={dataStudent.course_score_hk}
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
        label="Điểm tích lũy"
        name="course_score_tl"
        initialValue={dataStudent.course_score_tl}
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
        label="Điểm rèn luyện"
        name="conduct_score"
        initialValue={dataStudent.conduct_score}
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
        label="Điểm dưới C+"
        name="score_below_C_plus"
        initialValue={dataStudent.score_below_C_plus}
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
        label="Điểm F"
        name="score_fail"
        initialValue={dataStudent.score_fail}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
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

export default ScoreForm;
