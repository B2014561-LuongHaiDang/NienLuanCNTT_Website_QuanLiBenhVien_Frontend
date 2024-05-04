import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo_login.jpg'
import { Image } from 'antd'
import { useNavigate } from 'react-router-dom'
// import { useMutation } from '@tanstack/react-query'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/userMutationHook.js'
// import Loading from '../../components/LoadingComponent/Loading.jsx'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide.js'

const SignInPage = () => {
  const [name, setName] = useState('');
  const [cccd, setCCCD] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  const { data, isSuccess } = mutation

  useEffect(() => {
    if(isSuccess){
      console.log('data', data);
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if(data?.access_token){
        const decoded = jwtDecode(data?.access_token)
        console.log('decoded', decoded);
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }


        if(decoded?.isAdmin) {
          navigate('/admin')

        } else {

          navigate('/thongtinbenhvien')
        }
        
      }


    }
  }, [isSuccess])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetaislUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
  }

  console.log('mutation', mutation);

  const handleNavigateSignUp = () => {
    navigate('/signup')
  }

  const handleOnchangeName = (value) => {
    setName(value)
  }

  const handleOnchangeCCCD = (value) => {
    setCCCD(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleSignIn = () => {
    mutation.mutate({
      name,
      cccd,
      password
    })
    console.log('signup', name, cccd, password);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="Tên" value={name} onChange={handleOnchangeName} />
          <InputForm style={{ marginBottom: '10px' }} placeholder="Nhập CCCD gồm 12 số" value={cccd} onChange={handleOnchangeCCCD} />
          <InputForm placeholder="Mật khẩu" type="password" value={password} onChange={handleOnchangePassword} />
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          {/* <Loading isLoading={isLoading}> */}
            <ButtonComponent
              disabled={!name.length || !cccd.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px',
              }}
              textButton={'Đăng Nhập'}
              styleTextButton={{ color: '#fff', fontsize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          {/* </Loading> */}

          <WrapperTextLight>Quên mật khẩu</WrapperTextLight>
          <p>Bạn chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp} style={{ cursor: 'pointer' }}>Đăng ký</WrapperTextLight></p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignInPage