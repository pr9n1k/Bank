import { List, Pagination } from 'antd';
import React, { useState } from 'react';
import EmployeeItem from './EmployeeItem';
import { employeeAPI } from './../../../service/employeeService';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [page,setPage] = useState(1); 
    const {data,isLoading,error} = employeeAPI.useGetQuery({limit:6,page});
    // const employee = data?.employee || [] as Employee[];
    // const [filter, setFilter] = useState({query:''})
    // const searchEmployee = useEmployee(employee,filter.query);  
    const totalCount = data && data.number ? data.number : 0 ;  
    const onChange = (page: number) => {
      setPage(page);
    }
    if(isLoading){
      return <h1>Загрузка...</h1>
    }
    if(error){
      return <h1>{error}</h1>
    }
    return (
      <>
        <h1 className='h1 title'>Сотрудники</h1>
        {/* <EmployeeFilter filter={filter} setFilter={setFilter}/> */}
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
            dataSource={data?.employee}
            renderItem={(item, i) => (
              <List.Item key={i}>
                <EmployeeItem employee={item} />
              </List.Item>
            )}
          />
          <Link to={'/admin/employee/create'}>Добавить сотрудника</Link>
        </div>
        {totalCount > 6 &&  
          <Pagination current={page} onChange={onChange} total={totalCount} defaultPageSize={6} defaultCurrent={1}/>
        }
      </>
    );
}

export default EmployeeList;