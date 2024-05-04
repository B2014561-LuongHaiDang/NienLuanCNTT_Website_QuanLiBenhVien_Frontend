import { Button, Col, Modal, Row, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { updateSchedule } from '../../services/ScheduleService'
import moment from 'moment';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const ScheduleItem = ({ schedule }) => {

    useEffect(() => {
        setStatus(schedule.status)
    }, [])
    const [status, setStatus] = useState(false)


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        updateSchedule(schedule._id, { status }).then(res => {
            console.log({ res });
            if (res.status === 'OK') {
                message.success(res.message)
            }
        })
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };




    return (
        <div style={{ border: "1px solid #ccc" }}>
            <div>
            <Row gutter={[24, 24]} justify="center" align="middle" >
                <Col xs={24} sm={5}>
                    <img src={schedule?.doctorId?.avatar} alt="avatar" style={{
                        height: '100px',
                        width: '100px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }} />
                </Col>
                <Col xs={24} sm={5} style={{ paddingTop: "10px" }}>
                    <p>Tên bác sĩ: {schedule?.doctorId?.name}</p>
                </Col>
                <Col xs={24} sm={4} style={{ paddingTop: "7px" }}>
                    <p>Người đặt lịch: {schedule?.userId?.name}</p>
                </Col>
                <Col xs={24} sm={3}>
                    <select value={status} onChange={(e) => setStatus(e.target.value === "true")}>
                        <option value={true}> {'Đã duyệt'}</option>
                        <option value={false}> {'Chưa duyệt'}</option>
                    </select>
                </Col>
                <Col xs={24} sm={4}>
                    <Button type="primary" onClick={showModal}>Xem thông tin</Button>
                    <Modal title="Thông tin lịch khám bệnh" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Tên bác sĩ: {schedule?.doctorId?.name}</p>
                        <p>Chuyên môn: {schedule?.doctorId?.specialist}</p>
                        <p>Người đặt lịch: {schedule?.userId?.name}</p>
                        <p>CCCD: {schedule?.userId?.cccd}</p>
                        <p>Địa chỉ: {schedule?.address}</p>
                        <p>Ngày/tháng/năm sinh: {schedule?.birthday}</p>
                        <p>Số điện thoại: {schedule?.phone}</p>
                        <p>Ngày đặt lịch: {moment(schedule?.createdAt).format('DD/MM/YYYY')}</p>
                    </Modal>
                </Col>
                <Col xs={24} sm={3}>
                <ButtonComponent
            onClick={handleOk}
            size={40}
            styleButton={{
              height: '30px',
              width: 'fit-content',
              borderRadius: '4px',
              padding: '2px 6px 4px',
            }}
            textButton={'Duyệt'}
            styleTextButton={{ color: '#ADD8E6', fontsize: '15px', fontWeight: '700' }}
          ></ButtonComponent>
                </Col>
            </Row>
            </div>
        </div>
    )
}

export default ScheduleItem