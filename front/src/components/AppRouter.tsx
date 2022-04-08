import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './../pages/Main';
import Login from './../pages/Login';
import Admin from '../pages/Admin';
import Cashier from '../pages/Cashier';
import Operator from '../pages/Operator';
import CreateEmployee from './Admin/Employee/CreateEmployee';
import AdminMain from './Admin/AdminMain';
import Employee from './Admin/Employee/Employee'
import NotFound from './../pages/NotFound';
import CashierMain from './Cashier/CashierMain';
import CreateClient from './Operator/Client/CreateClient';
import OperatorMain from './Operator/OperatorMain';
import ClientList from './Operator/Client/ClientList';
import Client from './Operator/Client/Client';
import CreateAccount from './Operator/Account/CreateAccount';
import Operation from './Operator/Operation/Operation';
import DepartmentList from './Admin/Department/DepartmentList';
import Department from './Admin/Department/Department';
import DepartmentCreateForm from './Admin/Department/DepartmentCreateForm';
import EmployeeList from './Admin/Employee/EmployeeList';
import Communal from './Cashier/Сommunal/Communal';
import Payments from './Cashier/Payments/Payments';
import Balance from './Balance/Balance';


const AppRouter = () => {   
    return (
        <Routes>
            <Route path='main' element={<Main />} />
            <Route path='admin' element={<Admin/>}>
                <Route index element={<AdminMain />}/>
                <Route path='employee' element={<EmployeeList />} />
                <Route path='employee/create' element={<CreateEmployee />}/>
                <Route path='employee/:id' element={<Employee />}/>
                <Route path='department' element={<DepartmentList />} />
                <Route path='department/create' element={<DepartmentCreateForm />} />
                <Route path='department/:id' element={<Department />} />
            </Route>
            <Route path='cashier' element={<Cashier/>} >
                <Route index element={<CashierMain />} />
                <Route path='communal' element={<Communal />} />
                <Route path='payments' element={<Payments />} />
                <Route path='balance' element={<Balance />} />
            </Route>
            <Route path='operator' element={<Operator/>} >
                <Route index element={<OperatorMain />} />
                <Route path='create-client' element={<CreateClient />} />
                <Route path='client' element={<ClientList />} />
                <Route path='client/:id' element={<Client />} >
                    <Route path='create-account' element={<CreateAccount />} />    
                </Route>
                <Route path='operation' element={<Operation />} />
                <Route path='balance' element={<Balance />} />
            </Route>
            <Route path='/login' element={<Login/>} />
            <Route path="*" element={<Main/>} />
        </Routes>
    );
}

export default AppRouter;