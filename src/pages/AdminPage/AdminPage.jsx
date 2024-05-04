import { Button, Menu, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import thư viện React Router
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getAllSchedule } from '../../services/ScheduleService';
import ScheduleItem from './ScheduleItem';

const AdminPage = () => {
  const user = useSelector((state) => state.user)

  useEffect(() => {
    getAllSchedule().then(res => {
      setSchedules(res.data)
    })


  }, [])

  const [schedules, setSchedules] = useState([]);

  const items = [
    getItem('Lịch khám bệnh', 'sub1', <UserOutlined />, [
      getItem(<Link to="#">Danh sách</Link>, '1'),
    ]),
    getItem('Bác sĩ', 'sub2', <AppstoreOutlined />, [
      // Sử dụng component <Link> của React Router để chuyển đến trang cụ thể khi nhấp vào mục menu
      getItem(<Link to="/admin/doctor">Thêm</Link>, '2'), // Ví dụ: '/admin/add-doctor' là đường dẫn tới trang thêm bác sĩ
      getItem(<Link to="/admin/doctor/list">Danh sách</Link>, '3'),
    ]),
    getItem('Thông tin người dùng', 'sub3', <AppstoreOutlined />, [
      // Sử dụng component <Link> của React Router để chuyển đến trang cụ thể khi nhấp vào mục menu
      getItem(<Link to="/admin/user/list">Thêm</Link>, '4'), // Ví dụ: '/admin/add-doctor' là đường dẫn tới trang thêm bác sĩ
    ]),
  ];

  const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);  
    }
  };


  return (
    <div className='' style={{ display: 'flex' }}>

      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 256,
        }}
        items={items}
      />
      <div style={{ padding: '20px', }}>
        {schedules && schedules?.map(schedule =>
       <  ScheduleItem schedule={schedule}  />
        )}
      </div>
    </div>
  );
}

export default AdminPage;
