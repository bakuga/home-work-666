import React, { useState } from 'react';
import s from './HW11.module.css';
import s2 from '../../s1-main/App.module.css';
import { restoreState } from '../hw06/localStorage/localStorage';
import SuperRange from './common/c7-SuperRange/SuperRange';

function HW11() {
    // value1 по умолчанию 0.
    // value2 по умолчанию 100, но может быть 98 (или другое) из localStorage.
    const [value1, setValue1] = useState(restoreState<number>('hw11-value1', 0));
    const [value2, setValue2] = useState(restoreState<number>('hw11-value2', 100));
    const MAX_VALUE = 100; // Определяем максимальное значение для слайдеров

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            // Изменился двойной слайдер
            // MUI с disableSwap гарантирует, что newValue[0] <= newValue[1]
            const [newVal1, newVal2] = newValue;
            setValue1(newVal1);
            setValue2(newVal2);
        } else {
            // Изменился одиночный слайдер (newValue - это новое значение для value1)
            const newSingleValue = newValue as number;

            setValue1(newSingleValue); // Устанавливаем новое значение для value1

            // Если новое значение value1 (newSingleValue) стало больше ТЕКУЩЕГО value2,
            // то value2 должен "подтянуться" к newSingleValue.
            // Это гарантирует, что value1 <= value2 всегда.
            if (newSingleValue > value2) {
                // value2 здесь - это значение из предыдущего состояния/рендера.
                setValue2(newSingleValue);
            }
        }
    };

    return (
        <div id={'hw11'}>
            {/* Убедитесь, что здесь Homework #11, а не #1 как в вашем последнем фрагменте */}
            <div className={s2.hwTitle}>Homework #11</div>
            <div className={s2.hw}>
                <div className={s.container}>
                    <div className={s.wrapper}>
                        <span id={'hw11-value'} className={s.number}>{value1}</span>
                        <SuperRange
                            id={'hw11-single-slider'}
                            value={value1}
                            onChange={handleChange}
                            max={MAX_VALUE} // Используем константу
                            // min={0} // min по умолчанию 0 для MUI Slider
                        />
                    </div>
                    <div className={s.wrapper}>
                        <span id={'hw11-value-1'} className={s.number}>{value1}</span>
                        <SuperRange
                            id={'hw11-double-slider'}
                            value={[value1, value2]} // Теперь [value1, value2] всегда будет корректным диапазоном
                            onChange={handleChange}
                            min={0}
                            max={MAX_VALUE} // Используем константу
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