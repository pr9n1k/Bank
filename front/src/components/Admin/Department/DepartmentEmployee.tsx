import { Button } from 'antd';
import React, { useState } from 'react';
import DepartmentTableEmployee from './DepartmentTableEmployee';

const DepartmentEmployee = () => {
    return (
        <>
            <h1 className='h1 title'>Сотрудники</h1>
                <DepartmentTableEmployee />
        </>
    );
}

export default DepartmentEmployee;