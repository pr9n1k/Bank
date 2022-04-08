import React from 'react';
import MainButton from '../components/MainButton/MainButton';
import { useTakeEmployee } from './../hooks/useTakeEmployee';

const Main = () => {
    const {isLoading} = useTakeEmployee();
    if(isLoading){
        return <h1>Загузка...</h1>
    }
    return (
        <>
            <MainButton />
        </>
    );
}

export default Main;