import { Button, Input } from 'antd'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
function ButtonInputSearch() {
  return (
    <div>
        <Input placeholder="Basic usage" />;
        <Button size='large' icon={<SearchOutlined />} >Default</Button>
    </div>
  )
}

export default ButtonInputSearch