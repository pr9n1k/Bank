import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import CommunalDataForm from './CommunalDataForm';
import { Communal as ICommunal } from '../../../models/Communal';
import Print from './Print';
import { nowDate } from './../../../utils/date';
import { useCommunal } from '../../../hooks/useCommunal';
import { departmentAPI } from './../../../service/department';
import { Department } from '../../../models/Department';

const Communal = () => {
    const date = nowDate(new Date());
    const idEmployee = localStorage.getItem('user') || '';
    const {data:department, isLoading} = departmentAPI.useGetByEmployeeQuery(idEmployee);
    const {account} = useCommunal()
    const [communal,setCommunal] = useState({} as ICommunal)
    const [visible,setVisible] = useState(false)
    useEffect(()=>{
            setCommunal({
                ...communal,
                date,
                idEmployee,
            })
    },[])
    
    const submit = () => {
        if(communal.communals.length){
            setVisible(true);
        }else{
            message.warning('Коммунальные данные не введены')
        }
    }
    if(isLoading){
        return <h1>Загрузка...</h1>
    }
    return (
        <>
            <h1 className='h1 title'>Коммунальные услуги</h1>
            {!visible
                ?<CommunalDataForm communal={communal} setCommunal={setCommunal} submit={submit}/>
                :<Print communal={communal} account={account} department={department || {} as Department} setVisible={setVisible}/>
            }
        </>
    );
}

export default Communal;