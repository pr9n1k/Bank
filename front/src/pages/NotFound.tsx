import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../components/page';

const NotFound = () => {
    const router = useNavigate()
    return (
        <Page>
            <h1 style={{textAlign: 'center'}}>Страница не найдена</h1>
            <Button 
                onClick={() => router('/main')}
            >
                На главную
            </Button>
        </Page>
    );
}

export default NotFound;