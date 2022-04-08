import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const router = useNavigate()
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Страница не найдена</h1>
            <Button 
                onClick={() => router('/main')}
            >На главную</Button>
        </div>
    );
}

export default NotFound;