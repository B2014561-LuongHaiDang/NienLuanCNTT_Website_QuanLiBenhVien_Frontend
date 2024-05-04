import React, { useEffect, useState } from "react";
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { useMutationHooks } from "../../hooks/userMutationHook";
import * as message from '../../components/Message/Message'
import { Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user)

  const [name, setName] = useState(user?.name)
  const [cccd, setCCCD] = useState(user?.cccd)
  const [avatar, setAvatar] = useState(user?.avatar)

  const mutation = useMutationHooks(
    data => {
      const { id, ...rests } = data
      UserService.updateUser(id, rests)
    }
  )

  const { isSuccess, isError } = mutation

  useEffect(() => {
    setName(user?.name)
    setCCCD(user?.cccd)
    setAvatar(user?.avatar)

  }, [user])

  useEffect(() => {
    if (isSuccess) {
      message.success()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleOnchangeCCCD = (value) => {
    setCCCD(value)
  }
  const handleOnchangeName = (value) => {
    setName(value)
  }
  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview)
  }
  

  const handleUpdate = () => {
    mutation.mutate({ id: user?.id, name, cccd, avatar })
  }
  return (
    <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>

      <WrapperContentProfile>
        <WrapperInput>
          <WrapperLabel htmlFor="name">Tên</WrapperLabel>
          <InputForm id="name" style={{ width: "300px" }} value={name}
            onChange={handleOnchangeName} />
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
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="cccd">CCCD</WrapperLabel>
          <InputForm id="cccd" style={{ width: "300px" }} value={cccd}
            onChange={handleOnchangeCCCD} />
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
            }} alt="avatar"/>
          )}
          {/* <InputForm id="avatar" style={{ width: "300px" }} value={avatar}
            onChange={handleOnchangeAvatar} /> */}
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: '30px',
              width: 'fit-content',
              borderRadius: '4px',
              padding: '2px 6px 4px',
              marginLeft: '91px',
            }}
            textButton={'Cập Nhập'}
            styleTextButton={{ color: '#ADD8E6', fontsize: '15px', fontWeight: '700' }}
          ></ButtonComponent>
        </WrapperInput>

      </WrapperContentProfile>
    </div>
  );
}

export default ProfilePage;
