import React, { useState } from 'react'
import { Image } from 'antd'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo_login.jpg'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/userMutationHook'
// import * as message from '../../components/Message/Message'

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [cccd, setCCCD] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )

  const { data } = mutation

  // useEffect(() => {
  //   if(isSuccess){
  //     message.success()
  //     // handleNavigateSignIn()
  //   }else if(isError){
  //     message.error()
  //   }
  // }, [isSuccess, isError])

  const handleOnchangeName = (value) => {
    setName(value)
  }

  const handleOnchangeCCCD = (value) => {
    setCCCD(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }


  const handleNavigateSignIn = () => {
    navigate('/signin')
  }

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      // Nếu mật khẩu không khớp, hiển thị thông báo lỗi và không gửi yêu cầu đăng ký
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }else{
      // Nếu mật khẩu khớp, gửi yêu cầu đăng ký bình thường
    mutation.mutate({
      name, cccd, password, confirmPassword
    });
    navigate('/signin')
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng ký</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="Tên" value={name} onChange={handleOnchangeName} />
          <InputForm style={{ marginBottom: '10px' }} placeholder="Nhập CCCD gồm 12 số" value={cccd} onChange={handleOnchangeCCCD} />
          <InputForm style={{ marginBottom: '10px' }} placeholder="Mật khẩu" type="password" value={password} onChange={handleOnchangePassword} />
          <InputForm placeholder="Xác nhận Mật khẩu" type="password" value={confirmPassword} onChange={handleOnchangeConfirmPassword} />
          {data?.status === 'ERR' && <span style={{ color: 'red', fontSize: '16px', paddingTop: '10px'}}>{data?.message}</span>}
          <ButtonComponent
            disabled={!name.length || !cccd.length || !password.length || !confirmPassword.length}
            onClick={handleSignUp}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px',
            }}
            textButton={'Đăng Ký'}
            styleTextButton={{ color: '#fff', fontsize: '15px', fontWeight: '700' }}
          ></ButtonComponent>
          <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn} style={{ cursor: 'pointer' }}>Đăng nhập</WrapperTextLight></p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage