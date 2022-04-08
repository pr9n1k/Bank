import { List, Pagination } from 'antd';
import React, { useState } from 'react';
import { clientAPI } from '../../../service/clientService';
import ClientItem from './ClientItem';

const ClientList = () => {
    const [page,setPage] = useState(1); 
    const {data,isLoading,error} = clientAPI.useGetQuery({limit:6,page});
    const totalCount = data && data.number ? data.number : 0;
    if(isLoading){
      return <h1>Загрузка...</h1>
    }
    if(error){
      return <h1>{error}</h1>
    }
    const onChange = (page: number) => {
      setPage(page);
    }
    return (
      <>
      <h1 className='h1 title'>Клиенты</h1>
      <List
        style={{flex:'1 0 auto'}}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={data?.client}
        renderItem={(item, i) => (
          <List.Item key={i}>
            <ClientItem client={item} />
          </List.Item>
        )}
      />
      {totalCount > 6 &&
        <Pagination 
          current={page} 
          onChange={onChange} 
          total={totalCount} 
          defaultPageSize={6} 
          defaultCurrent={1}
        />
      }
      </>
    );
}

export default ClientList;