
import React, { useEffect, useState } from 'react';
import { getAllDoctor } from '../../services/DoctorService';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { WrapperBody, WrapperText, WrapperTextName } from './style';

const DoctorPage = () => {
  useEffect(() => {
    getAllDoctor().then(res => {
      setDoctors(res.data)
    })
  }, [])

  const [doctors, setDoctors] = useState([]);

  return (
<div style={{ color: "transparent" }}>

    <WrapperBody>
      <Row gutter={[16, 16]}> {/* Khoảng cách giữa các cột */}
        {doctors && doctors.map(doctor => (
          <Col xs={24} sm={12} md={8} lg={6} key={doctor._id} align="middle"> {/* Chia thành 4 cột trên mọi kích thước màn hình */}
            <Link to={`/doctor/${doctor._id}`}>
              <img src={doctor.avatar} alt="avatar" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                width: '200px',
                borderRadius: '50%',
                objectFit: 'cover'
              }} />
              <WrapperTextName>{doctor.name}</WrapperTextName>
              <WrapperText>{doctor.specialist}</WrapperText>
            </Link>
          </Col>
        ))}
      </Row>
    </WrapperBody>
</div>
  );
}

export default DoctorPage