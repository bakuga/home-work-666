import React, { useState, useEffect } from 'react'; // Добавили useEffect
import s from './HW11.module.css';
import s2 from '../../s1-main/App.module.css';
import { restoreState } from '../hw06/localStorage/localStorage';
import SuperRange from './common/c7-SuperRange/SuperRange';

function HW11() {
    const [value1, setValue1] = useState(restoreState<number>('hw11-value1', 0));
    const [value2, setValue2] = useState(restoreState<number>('hw11-value2', 100));
    const MAX_VALUE = 100;

    // Этот state нужен только для "встряски" пропса value двойного слайдера
    const [doubleSliderValue, setDoubleSliderValue] = useState<[number, number]>([value1, value2]);

    useEffect(() => {
        // Синхронизируем doubleSliderValue, когда value1 или value2 изменяются извне
        setDoubleSliderValue([value1, value2]);
    }, [value1, value2]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        let newV1: number, newV2: number;

        if (Array.isArray(newValue)) {
            // Изменился двойной слайдер
            newV1 = newValue[0];
            newV2 = newValue[1];

            setValue1(newV1);
            setValue2(newV2);
            // setDoubleSliderValue([newV1, newV2]); // Обновится через useEffect

        } else {
            // Изменился одиночный слайдер
            newV1 = newValue as number;
            newV2 = value2; // Берем текущее значение value2

            setValue1(newV1); // Устанавливаем новое значение для value1

            if (newV1 > value2) { // Если value1 пытается обогнать value2
                newV2 = newV1;    // value2 будет "подтянуто"
                setValue2(newV2);
            }
            // setDoubleSliderValue([newV1, newV2]); // Обновится через useEffect
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
                            // Используем отдельный state для value, чтобы им можно было "встряхнуть"
                            value={doubleSliderValue}
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