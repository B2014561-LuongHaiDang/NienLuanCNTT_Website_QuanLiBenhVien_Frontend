import React, { useEffect, useState } from "react";
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { useMutationHooks } from "../../hooks/userMutationHook";
import * as message from '../../components/Message/Message'
import { getAllDoctor } from "../../services/DoctorService";

const HomePage = () => {
  const user = useSelector((state) => state.user)

  useEffect(()=>{
    getAllDoctor().then(res => {
      setDoctors(res.data)
    })
  },[])

  const [doctors, setDoctors] = useState([]);

  const [name, setName] = useState(user?.name)
  const [cccd, setCCCD] = useState(user?.cccd)
  const [address, setAddress] = useState(user?.address)
  const [birthday, setBirthday] = useState(user?.birthday)
  const [sex, setSex] = useState(user?.sex)
  const [phone, setPhone] = useState(user?.phone)
  const [nation, setNation] = useState(user?.nation)
  const [bhyt, setBHYT] = useState(user?.bhyt)
  const [dtmg, setDTMG] = useState(user?.dtmg)

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
    setAddress(user?.address)
    setBirthday(user?.birthday)
    setSex(user?.sex)
    setPhone(user?.phone)
    setNation(user?.nation)
    setBHYT(user?.bhyt)
    setDTMG(user?.dtmg)
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
  const handleOnchangeAddress = (value) => {
    setAddress(value)
  }
  const handleOnchangeBirthday = (value) => {
    setBirthday(value)
  }
  const handleOnchangeSex = (value) => {
    setSex(value)
  }
  const handleOnchangePhone = (value) => {
    setPhone(value)
  }

  const handleUpdate = () => {
    mutation.mutate({ id: user?.id, name, cccd, address, birthday, sex, phone, nation, bhyt, dtmg })
  }
  
  return (
    <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
      <WrapperHeader>Vui lòng nhập thông tin cá nhân</WrapperHeader>

      <WrapperContentProfile>
        <WrapperInput>
          <WrapperLabel htmlFor="name">Tên</WrapperLabel>
          <InputForm id="name" style={{ width: "300px" }} value={name}
            onChange={handleOnchangeName} />

        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="cccd">CCCD</WrapperLabel>
          <InputForm id="cccd" style={{ width: "300px" }} value={cccd} disabled
            onChange={handleOnchangeCCCD} />

        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
          <InputForm id="address" style={{ width: "300px" }} value={address}
            onChange={handleOnchangeAddress} />

        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="birthday">Ngày/Tháng/Năm sinh</WrapperLabel>
          <InputForm id="birthday" style={{ width: "300px" }} value={birthday}
            onChange={handleOnchangeBirthday} />

        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="sex">Giới tính</WrapperLabel>
          <InputForm id="sex" style={{ width: "300px" }} value={sex}
            onChange={handleOnchangeSex} />

        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>
          <InputForm id="phone" style={{ width: "300px" }} value={phone}
            onChange={handleOnchangePhone} />

        </WrapperInput>

        <ButtonComponent
          onClick={handleUpdate}
          size={40}
          style={{
            display: 'flex',
            justifyContent: 'center',
            }}
        styleButton={{
          height: '30px',
          width: 'fit-content',
          borderRadius: '4px',
          padding: '2px 6px 4px',
        }}
        textButton={'Đặt lịch khám'}
        styleTextButton={{ color: '#000', fontsize: '15px', fontWeight: '700' }}
          ></ButtonComponent>

    </WrapperContentProfile>
    </div >
  );
}

export default HomePage