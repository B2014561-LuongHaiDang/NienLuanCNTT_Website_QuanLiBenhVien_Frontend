
import React, { useEffect, useState } from 'react'
import { WrapperHearder, WrapperTextCenter, WrapperHeaderAccount, WrapperContentPopup, WrapperTextCenterHome } from './style'
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from 'antd';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide.js'
import LoadLoad from '../LoadingComponent/Loading.jsx';


const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [Loading, setLoading] = useState(false)

    const handleNavigateLogin = () => {
        navigate('/signin')
    }
    const handleLogout = async () => {
        setLoading(false)
        await UserService.logoutUser()
        dispatch(resetUser())
        
        setLoading(true)
    }

    useEffect(() => {
        setLoading(false)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(true)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/admin')}>Quản lí</WrapperContentPopup>
            )}
        </div>
    );
    return (
        <div>
            <WrapperHearder>
                <WrapperTextCenterHome span={12}>QUẢN LÍ BỆNH VIỆN</WrapperTextCenterHome>
                {!user?.isAdmin && (
                    <>
                <WrapperTextCenter onClick={() => navigate('/doctor')} span={4}>ĐẶT LỊCH KHÁM BỆNH</WrapperTextCenter>
                <WrapperTextCenter onClick={() => navigate('/thongtinbenhvien')} span={4}>THÔNG TIN BỆNH VIỆN</WrapperTextCenter>
                </>
            )}
            {user?.isAdmin && (
                    <>
                <WrapperTextCenter span={4}></WrapperTextCenter>
                <WrapperTextCenter span={4}></WrapperTextCenter>
                </>
            )}
                <WrapperTextCenter span={4}>
                    {/* <LoadLoad setLoading={Loading}> */}
                    <WrapperHeaderAccount>
                        {userAvatar ? (
                            <img src={userAvatar} alt="avatar" style={{
                                height: '30px',
                                width: '30px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} />
                        ) : (
                            <UserOutlined style={{ fontSize: "28px", color: "#fff" }} />
                        )
                        }
                        {user?.access_token ? (
                            <>
                                <Popover content={content} trigger="click">
                                    <div style={{ cursor: 'pointer' }}>{userName}</div>
                                </Popover>
                            </>
                        ) : (
                            <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                <span>Đăng nhập/Đăng kí</span>
                                <div>
                                    <span>Tài khoản</span>
                                    <CaretDownOutlined />
                                </div>
                            </div>
                        )}
                    </WrapperHeaderAccount>
                    {/* </LoadLoad> */}
                </WrapperTextCenter>
            </WrapperHearder>
        </div>
    )
}

export default HeaderComponent