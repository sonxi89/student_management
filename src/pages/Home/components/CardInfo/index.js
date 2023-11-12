import { Tag, Divider, Row, Col, Spin, Tooltip } from 'antd';
import '../SummaryCard/SummaryCard.scss';

export default function CardInfo({ title, tagContent, tagColor, icon, isLoading = false }) {
  return (
    <Col className="gutter-row">
      <div className="whiteBox shadow" style={{ color: '#595959', fontSize: 13, minHeight: '106px', height: '100%' }}>
        <div className="pad15 strong" style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-around' }}>
          <img width={30} src={icon} />
          <h3 style={{ margin: 'auto', textTransform: 'capitalize' }}>{title}</h3>
        </div>
        <Divider style={{ padding: 0, margin: 0 }}></Divider>
        <div className="pad15">
          <Row gutter={[0, 0]} justify="space-between" wrap={false}>
            <Col className="gutter-row" flex="70px" style={{ textAlign: 'left' }}>
              <div className="left strong" style={{ whiteSpace: 'nowrap' }}>
                Tổng
              </div>
            </Col>
            <Divider
              style={{
                height: '100%',
                padding: '10px 0',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              type="vertical"
            ></Divider>
            <Col
              className="gutter-row"
              flex="auto"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isLoading ? (
                <Spin />
              ) : (
                <Tooltip title={tagContent}>
                  <Tag
                    color={tagColor}
                    style={{
                      margin: '0 auto',
                      justifyContent: 'center',
                      maxWidth: '110px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    130000
                  </Tag>
                </Tooltip>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
}
