import { Button, Col, Menu, Row, message } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import thư viện React Router
import { getItem } from '../../../utils';
import { UserOutlined, AppstoreOutlined, UploadOutlined } from '@ant-design/icons';
import { getBase64 } from "../../../utils";
import InputForm from '../../../components/InputForm/InputForm';
import { WrapperContentProfile, WrapperInput, WrapperLabel, WrapperUploadFile } from './style';
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent';
import { createDoctor } from '../../../services/DoctorService';

const Doctor = () => {

  const items = [
    getItem('Lịch khám bệnh', 'sub1', <UserOutlined />, [
      getItem(<Link to="/admin">Danh sách</Link>, '1'),
    ]),
    getItem('Bác sĩ', 'sub2', <AppstoreOutlined />, [
      // Sử dụng component <Link> của React Router để chuyển đến trang cụ thể khi nhấp vào mục menu
      getItem(<Link to="#">Thêm</Link>, '2'), // Ví dụ: '/admin/add-doctor' là đường dẫn tới trang thêm bác sĩ
      getItem(<Link to="/admin/doctor/list">Danh sách</Link>, '3'),
    ]),
    getItem('Thông tin người dùng', 'sub3', <AppstoreOutlined />, [
      // Sử dụng component <Link> của React Router để chuyển đến trang cụ thể khi nhấp vào mục menu
      getItem(<Link to="/admin/user/list">Danh sách</Link>, '4'), // Ví dụ: '/admin/add-doctor' là đường dẫn tới trang thêm bác sĩ
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

  const [name, setName] = useState('')
  const [maso, setMaso] = useState('')
  const [avatar, setAvatar] = useState('')
  const [specialist, setSpecialist] = useState('')

  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview)
  }

  const handleUpdate = () => {
    console.log({name, maso, avatar, specialist});
    createDoctor({name, maso, avatar, specialist}).then(res => {
      if (res.status === "OK") {
          message.success(res.data.message)
      }
  })
      
  }
  return (
    <div>
      <Row>
      <Col span={5}>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 256,
        }}
        items={items}
      />

      </Col>
      <Col span={19}>
      <div style={{ paddingTop: "20px", marginRight:"50px" }}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Tên</WrapperLabel>
            <InputForm id="name" style={{ width: "300px" }} value={name}
              onChange={setName} />
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="maso">Mã số Bác sĩ</WrapperLabel>
            <InputForm id="maso" style={{ width: "300px" }} value={maso}
              onChange={setMaso} />
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Ảnh</WrapperLabel>
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </WrapperUploadFile>
            {avatar && (
              <img src={avatar} style={{
                height: '60px',
                width: '60px',
                borderRadius: '50%',
                objectFit: 'cover'
              }} alt="avatar" />
            )}
            {/* <InputForm id="avatar" style={{ width: "300px" }} value={avatar}
            onChange={handleOnchangeAvatar} /> */}
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="specialist">Chuyên môn</WrapperLabel>
            <InputForm id="specialist" style={{ width: "300px" }} value={specialist}
              onChange={setSpecialist} />
            
          </WrapperInput>
          <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '2px 6px 4px',
              }}
              textButton={'Cập Nhập'}
              styleTextButton={{ color: '#ADD8E6', fontsize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
        </WrapperContentProfile>
      </div>

      </Col>
    </Row>



    </div>



  );
}

export default Doctor