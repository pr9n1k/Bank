import React, { FC } from 'react';
import Navbar from './UI/Navbar/Navbar';
interface PageProps{
    title?: string
}
const Page:FC<PageProps> = ({children,title}) => {
    return (
        <div className="body">
            <Navbar />
            <div className='main'>
                {title &&
                    <h1 className='h1 title'>{title}</h1>
                }
                {children}
            </div>
        </div>
    );
}

export default Page;