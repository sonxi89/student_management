import React, { useState } from 'react';
import { Col, Row, Space, Button } from 'antd';
import './InfoStudent.scss';

const DescriptionItem = ({ title, content }) => (
  <Row key={title} gutter={12}>
    <Col className="gutter-row" span={8}>
      <p>{title}</p>
    </Col>
    <Col className="gutter-row" span={2}>
      <p> : </p>
    </Col>
    <Col className="gutter-row" span={14}>
      <p>{content}</p>
    </Col>
  </Row>
);

function InfoStudent({ data, showFormEdit, showDeleteConfirm }) {
  return (
    <>
      <Row>
        <Col span={24}>
          <DescriptionItem title="Họ tên" content={data.student_name} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Mã sinh viên" content={data.student_code} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Ngày sinh" content={data.student_dob} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Lớp" content={data.class_code} />
        </Col>
        {data.student_position != null && (
          <Col span={24}>
            <DescriptionItem title="Chức vụ" content={data.student_position ? 'Cán bộ lớp' : null} />
          </Col>
        )}
      </Row>

      <Space wrap style={{ marginTop: '30px' }}>
        <Button onClick={() => showFormEdit(data, 'edit')} type="primary">
          Sửa
        </Button>
        <Button onClick={() => showDeleteConfirm(data.id)} danger>
          Xóa
        </Button>
      </Space>
    </>
  );
}

export default InfoStudent;
