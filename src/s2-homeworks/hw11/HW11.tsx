import React, { useState } from 'react';
import s from './HW11.module.css';
import s2 from '../../s1-main/App.module.css';
import { restoreState } from '../hw06/localStorage/localStorage';
import SuperRange from './common/c7-SuperRange/SuperRange';

function HW11() {
    // Эта инициализация УЖЕ использует 0 и 100 как значения по умолчанию,
    // если в localStorage ничего не найдено.
    const [value1, setValue1] = useState(restoreState<number>('hw11-value1', 0));
    const [value2, setValue2] = useState(restoreState<number>('hw11-value2', 100));
    const MAX_VALUE = 100;

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            // Двойной слайдер
            const [newVal1, newVal2] = newValue;
            setValue1(newVal1);
            setValue2(newVal2);
        } else {
            // Одиночный слайдер
            const newSingleValue = newValue as number;
            setValue1(newSingleValue);
            // Гарантируем, что value1 <= value2
            if (newSingleValue > value2) {
                setValue2(newSingleValue);
            }
        }
    };

    return (
        <div id={'hw11'}>
            <div className={s2.hwTitle}>Homework #11</div>
            <div className={s2.hw}>
                <div className={s.container}>
                    <div className={s.wrapper}>
                        <span id={'hw11-value'} className={s.number}>{value1}</span>
                        <SuperRange
                            id={'hw11-single-slider'}
                            value={value1}
                            onChange={handleChange}
                            max={MAX_VALUE}
                        />
                    </div>
                    <div className={s.wrapper}>
                        <span id={'hw11-value-1'} className={s.number}>{value1}</span>
                        <SuperRange
                            id={'hw11-double-slider'}
                            value={[value1, value2]}
                            onChange={handleChange}
                            min={0}
                            max={MAX_VALUE}
                            disableSwap
                        />
                        <span id={'hw11-value-2'} className={s.number}>{value2}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HW11;