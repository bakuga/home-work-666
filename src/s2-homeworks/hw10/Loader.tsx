import React from 'react';
import s from './Loader.module.css'; // Подключаем стили

export const Loader = () => {
    return (
        <div className={s.loaderContainer}>
            <div className={s.loader}></div>
            {/* Можно добавить текст, если нужно, например: <span>Loading...</span> */}
        </div>
    );
};