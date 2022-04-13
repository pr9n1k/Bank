import { List } from 'antd';
import React from 'react';
import { operationAPI } from '../../service/operationServise';
import EncahsmentItem from './EncahsmentItem';

const EncashmentList = () => {
    const {data,isLoading,error} = operationAPI.useGetAdminQuery();
    if(!data?.length){
        return <h1 className='h1 title'>Запросов нет</h1>
    }
    if(isLoading){
        return <h1>Загрузка..</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    return (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
                <EncahsmentItem encashment={item}/>
            </List.Item>
          )}
        />
    );
}

export default EncashmentList;