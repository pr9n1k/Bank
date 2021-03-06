import { List, Pagination } from 'antd';
import React, { useState } from 'react';
import PaymentsItem from './PaymentsItem';
import { operationAPI } from '../../../service/operationServise';

const PaymentnsList = () => {
    const idEmployee = localStorage.getItem('user') || ''
    const [page,setPage] = useState(1); 
    const {data,error,isLoading} = operationAPI.useGetNotConfirmQuery({limit:6,page,idEmployee})
    const totalCount = data && data.number ? data.number : 0 ;  
    const onChange = (page: number) => {
        setPage(page);
    }
    if(error){
       return <h1>{error}</h1>
    }
    if(isLoading){
        return <h1>Загрузка..</h1>
    }
    return (
        <>        
            <div
                style={{flex:'1 0 auto'}}
            >
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
                dataSource={data?.operation}
                renderItem={item => (
                <List.Item>
                    <PaymentsItem opertaion={item}/>
                </List.Item>
                )}
            />
            </div>
            {totalCount > 6 &&  
              <Pagination current={page} onChange={onChange} total={totalCount} defaultPageSize={6} defaultCurrent={1}/>
            }
        </>
    );
}

export default PaymentnsList;