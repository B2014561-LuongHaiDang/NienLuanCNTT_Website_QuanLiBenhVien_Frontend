import React, { useEffect, useState } from "react";
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useSelector } from "react-redux";
import { getDetailsDoctor } from "../../services/DoctorService";
import { useParams } from 'react-router-dom';
import { createSchedule } from "../../services/ScheduleService";
import * as message from '../../components/Message/Message'


const DoctorDetail = () => {
    const user = useSelector((state) => state.user)
    const params = useParams()
    const [address, setAddress] = useState('')
    const [birthday, setBirthday] = useState('')
    const [phone, setPhone] = useState('')



    useEffect(() => {
        getDetailsDoctor(params.id).then(res => {
            setDoctor(res.data)
        })
    }, [params.id])

    const [doctor, setDoctor] = useState();

    const handleUpdate = () => {
        createSchedule({
            userId: user.id,
            doctorId: params.id, 
            address,
             birthday,
              phone
        }).then(res => {
            if (res.status === "OK") {
                message.success(res.data.message)
            }
        })
    }

    return (
        <div style={{ width: "1270px", margin: "0 auto", height: "500px" ,paddingTop: "10px"}}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img src={doctor?.avatar} alt="avatar" style={{
                    height: '200px',
                    width: '200px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                }} />
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{doctor?.name}</p>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{doctor?.specialist}</p>
            </div>

            <WrapperHeader>Vui lòng nhập thông tin cá nhân</WrapperHeader>

            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLabel htmlFor="name">Tên</WrapperLabel>
                    <InputForm id="name" style={{ width: "300px" }} value={user.name} disabled
                    />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor="cccd">CCCD</WrapperLabel>
                    <InputForm id="cccd" style={{ width: "300px" }} value={user.cccd} disabled
                    />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
                    <InputForm id="address" style={{ width: "300px" }} value={address}
                        onChange={setAddress}
                    />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor="birthday">Ngày/Tháng/Năm sinh</WrapperLabel>
                    <InputForm id="birthday" style={{ width: "300px" }} value={birthday}
                        onChange={setBirthday}
                    />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>
                    <InputForm id="phone" style={{ width: "300px" }} value={phone}
                        onChange={setPhone}
                    />

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

export default DoctorDetail