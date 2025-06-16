import React, { useState } from 'react'
import s from './HW11.module.css'
import s2 from '../../s1-main/App.module.css'
import { restoreState } from '../hw06/localStorage/localStorage'
import SuperRange from './common/c7-SuperRange/SuperRange'


function HW11() {
    const [value1, setValue1] = useState(restoreState<number>('hw11-value1', 0));
    const [value2, setValue2] = useState(restoreState<number>('hw11-value2', 99));

    const change = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            let [newVal1, newVal2] = newValue;

            // защита от совпадения
            if (newVal1 === newVal2) newVal1 = newVal2 - 1;

            // защита от крайних значений
            if (newVal2 > 99) newVal2 = 99;

            setValue1(newVal1);
            setValue2(newVal2);
        }

        if (Array.isArray(newValue)) {
            const [newVal1, newVal2] = newValue;

            // НЕ допускаем совпадения значений
            const adjustedVal1 = newVal1 === newVal2 ? newVal1 - 1 : newVal1;

            setValue1(adjustedVal1);
            setValue2(newVal2);
        } else {
            const newSingleValue = newValue as number;

            if (newSingleValue >= value2) {
                setValue1(value2 - 1);
            } else {
                setValue1(newSingleValue);
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
                            onChange={(e, val) => change(e, val as number)} // Передаем только число
                            min={0}
                            max={100} // Ограничиваем одиночный слайдер
                        />
                    </div>
                    <div className={s.wrapper}>
                        <span id={'hw11-value-1'} className={s.number}>{value1}</span>
                        <SuperRange
                            id={'hw11-double-slider'}
                            value={[value1, value2]}
                            onChange={change} // Эта функция уже обрабатывает массив
                            min={0}
                            max={99}
                            disableSwap // Важный проп для MUI Slider, чтобы ползунки не менялись местами
                        />
                        <span id={'hw11-value-2'} className={s.number}>{value2}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HW11
