import { Col, Menu, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import thư viện React Router
import { getItem } from '../../../utils';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { getAllDoctor } from '../../../services/DoctorService';
import { WrapperCol } from './style';

const DoctorList = () => {
  useEffect(() => {
    getAllDoctor().then(res => {
      setDoctors(res.data)
    })
  }, [])

  const [doctors, setDoctors] = useState([]);

  const items = [
    getItem('Lịch khám bệnh', 'sub1', <UserOutlined />, [
      getItem(<Link to="/admin">Danh sách</Link>, '1'),
    ]),
    getItem('Bác sĩ', 'sub2', <AppstoreOutlined />, [
      // Sử dụng component <Link> của React Router để chuyển đến trang cụ thể khi nhấp vào mục menu
      getItem(<Link to="/admin/doctor">Thêm</Link>, '2'), // Ví dụ: '/admin/add-doctor' là đường dẫn tới trang thêm bác sĩ
      getItem(<Link to="#">Danh sách</Link>, '3'),
    ]),
    getItem('Thông tin người dùng', 'sub3', <AppstoreOutlined />, [
      // Sử dụng component <Link> của React Router để chuyển đến trang cụ thể khi nhấp vào mục menu // Ví dụ: '/admin/add-doctor' là đường dẫn tới trang thêm bác sĩ
      getItem(<Link to="/admin/user/list">Danh sách</Link>, '4'),

    ]),
  ];

  const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];

  const [openKeys, setOpenKeys] = useState(['sub2']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 256 }}>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={items}
        />
      </div>
      <div style={{ marginLeft: '20px', marginTop: '15px' }}>
        <Row gutter={[16, 16]}>
          {doctors && doctors.map((doctor, index) =>
            <WrapperCol key={doctor._id} span={12}>
              <img src={doctor.avatar} alt="avatar" style={{
                height: '100px',
                width: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '10px' // margin để tạo khoảng cách giữa hình ảnh và nội dung
              }} />
              <div>
                <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Họ và tên: {doctor.name}</p>
                <p style={{ marginBottom: '5px' }}>Chuyên môn: {doctor.specialist}</p>
                <p style={{ marginBottom: '5px' }}>Mã số: {doctor.maso}</p>
              </div>
            </WrapperCol>
          )}
        </Row>
      </div>
    </div>
  );
}

export default DoctorList