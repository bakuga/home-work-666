
import React, { useState } from 'react';
import s from './HW11.module.css';
import s2 from '../../s1-main/App.module.css';
import { restoreState } from '../hw06/localStorage/localStorage';
import SuperRange from './common/c7-SuperRange/SuperRange';

function HW11() {
    const [value1, setValue1] = useState(restoreState<number>('hw11-value1', 0));
    const [value2, setValue2] = useState(restoreState<number>('hw11-value2', 100));

    const change = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            // Изменился двойной слайдер
            const [newVal1, newVal2] = newValue;
            // MUI с disableSwap гарантирует, что newVal1 <= newVal2
            setValue1(newVal1);
            setValue2(newVal2);
        } else {
            // Изменился одиночный слайдер (newValue - это новое значение для value1)
            const newSingleSliderValue = newValue as number;

            // Если новое значение одиночного слайдера (будущий value1)
            // больше ИЛИ РАВНО текущему value2 (особенно если value2 на максимуме),
            // или просто если новый value1 "догоняет" value2.
            // Мы хотим убедиться, что value2 "знает" об этом изменении.
            if (newSingleSliderValue >= value2) {
                // Если value1 догоняет или перегоняет value2,
                // устанавливаем оба значения. Это может помочь MUI "разблокировать"
                // ползунки, если они были на одной позиции.
                setValue1(newSingleSliderValue); // value1 становится новым значением
                setValue2(newSingleSliderValue); // value2 "подтягивается" к value1
            } else {
                // В противном случае (newSingleSliderValue < value2),
                // меняется только value1. value2 остается на месте.
                setValue1(newSingleSliderValue);
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
                            onChange={(e, val) => change(e, val as number)}
                            min={0}
                            max={100}
                        />
                    </div>

                    <div className={s.wrapper}>
                        <span id={'hw11-value-1'} className={s.number}>{value1}</span>
                        <SuperRange
                            id={'hw11-double-slider'}
                            value={[value1, value2]}
                            onChange={change}
                            min={0}
                            max={100}
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