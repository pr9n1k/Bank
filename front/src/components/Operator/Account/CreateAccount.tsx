import { Select } from 'antd';
import React, { useState } from 'react';
import CreateAccountForm from './CreateAccountForm';
import CreateLegalForm from './CreateLegalForm';

const CreateAccount = () => {
    const [variation,setVariation] = useState(0);
    return (
        <>
            <Select
                placeholder="Выберите категорию"
                onChange={e => setVariation(e)}
                style={{marginBottom: '20px'}}
            >
                <Select.Option value={1}>Физ.Лицо</Select.Option>
                <Select.Option value={2}>Юр.Лицо</Select.Option>
                <Select.Option value={3}>Ком.Предприятие</Select.Option>
            </Select>
            {variation === 1 && <CreateAccountForm />}
            {variation === 2 && <CreateLegalForm isCommunal={false} />}
            {variation === 3 && <CreateLegalForm isCommunal={true}/>}
        </>
    );
}

export default CreateAccount;