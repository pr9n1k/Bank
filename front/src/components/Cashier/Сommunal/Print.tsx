import { Button, message, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import React, { FC } from 'react';
import { Communal } from '../../../models/Communal';
import { summaString } from '../../../utils/summaString';
import { Department } from '../../../models/Department';
import { employeeAPI } from './../../../service/employeeService';
import { operationAPI } from '../../../service/operationServise';
import { accountAPI } from './../../../service/accountService';
interface PrintType{
    communal: Communal,
    account: any[],
    department: Department,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const Print:FC<PrintType> = ({communal,account,department,setVisible}) => {
  const {data:employee,isLoading} = employeeAPI.useGetByIdQuery(communal.idEmployee);
  const {data:accountDepartment,isLoading: isLoadingDepartment} = accountAPI.useGetQuery(department._id as string);
  const [addCommunal] = operationAPI.useAddCommunalMutation();
  let summa = '0.00';
  communal.communals.forEach(item => {
      summa = summaString([summa,item.money]);
  })

  const adress = communal.flat 
      ? `г. ${communal.city}, ул. ${communal.street}, д. ${communal.house}, кв. ${communal.flat}`
      : `г. ${communal.city}, ул. ${communal.street}, д. ${communal.house}`
  const data: any[] = [];
  communal.communals.forEach(item => {
    const accountCommunal = account.filter(acc => acc.title === item.title)
    data.push({
      key: item.title,
      title: item.title,
      accountCommunal: accountCommunal[0].accountCommunal,
      startDate: item.startDate,
      endDate: item.endDate,
      endCounter: item.endCounter,
      startCounter: item.startCounter,
      money: item.money
    })
  })
  const submit = () => {
    addCommunal({
      _id: '',
      number:'',
      accountDepartment: accountDepartment ? accountDepartment[0].number : '',
      city: communal.city,
      communals: data,
      date: communal.date,
      flat: communal.flat,
      fullName: communal.fullName,
      house: communal.house,
      idEmployee: communal.idEmployee,
      street: communal.street
    })
      .unwrap()
      .then(() => {
        message.success('Готово')
        setVisible(false)
      })
      .catch(e => message.error(e.data.message))
    
  }
  if(isLoading || isLoadingDepartment){
    return <h1>Загрузка...</h1>
  }
  return (
      <>
          <h2 className='h1 title'>Печать</h2>
          <p>Дата: {communal.date}</p>
          <p>Банк: ЦРБ ДНР Отделение №{department.number} г.{department.city}. Кассир: {employee?.surname} {employee?.name} {employee?.patronymic}.</p>
          <p>Адрес: {adress}</p>
          <Table  
            dataSource={data} 
            pagination={false}
          >
            <Column title="Услуга" dataIndex="title" key="title" />
            <Column title="Р/c получателя" dataIndex="accountCommunal" key="accountCommunal" />
            <ColumnGroup title="Период оплаты">
              <Column title="начало" dataIndex="startDate" key="startDate" />
              <Column title="конец" dataIndex="endDate" key="endDate" />
            </ColumnGroup>
            <ColumnGroup title="Показания счетчиков">
              <Column title="конец" dataIndex="endCounter" key="endCounter" />
              <Column title="началл" dataIndex="startCounter" key="startCounter" />
            </ColumnGroup>
            <Column title="Сумма" dataIndex="money" key="money" />
          </Table>
          <p>Итого: {summa} руб</p>
          <Button
            type='primary'
            onClick={submit}
            className='w-max-content'
          >Печать</Button>
      </>
  );
}

export default Print;