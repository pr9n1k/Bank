import Search from 'antd/lib/input/Search';
import React, { FC, useState } from 'react';
type EmployeeFilterType = { 
    filter: {
        query: string
    }
    setFilter: React.Dispatch<React.SetStateAction<{
        query: string
    }>>
}
const EmployeeFilter:FC<EmployeeFilterType> = ({filter,setFilter}) => {
    const onSearch = (value: string) => {setFilter({...filter, query: value})}
    const [input, setInput] = useState('');
    return (
           <Search
            value={input}
            onChange={e => setInput(e.target.value)}
            onSearch={onSearch}
            placeholder="Введите фамилию..."
           style={{width:"200px", margin:"20px auto"}}/> 
    );
}

export default EmployeeFilter;