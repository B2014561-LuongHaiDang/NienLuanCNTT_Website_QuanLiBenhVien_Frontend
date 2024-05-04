import { Col, Row } from "antd";
import styled from "styled-components";

export const WrapperHearder = styled(Row)`
    padding: 10px 120px;
    background-color: #ADD8E6
`

export const WrapperTextCenter = styled(Col)`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const WrapperTextCenterHome = styled(Col)`
    display: flex;    
    align-items: center;
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;    
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: #ADD8E6;
`