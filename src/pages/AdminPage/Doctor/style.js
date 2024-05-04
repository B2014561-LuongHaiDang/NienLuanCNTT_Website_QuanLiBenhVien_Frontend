import { Col, Upload } from "antd"
import styled from "styled-components"

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 18px;
    margin: 4px 0;
`

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 700px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 20px;
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 12px;
    line-height: 30px;
    font-weight: 600;
    width: 130px;
`

export const WrapperCol = styled.div`
    display: flex;
    justufy-content: center;
    align-items: center;
    width: 500px;
    border: 1px solid #ccc;
`

export const WrapperInput = styled(Col)`
    display: flex;
    align-items: center;
    gap: 50px
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none;
    }
`

export const StyledCol = styled(Col)`
    border-bottom: 1px solid #e8e8e8;
`

export const WrapperText = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: black;
`
export const WrapperTextName = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: black;
`

export const WrapperBody = styled.div`
    font-family: 'Noto Serif', serif;
    padding-top: 20px;
`
