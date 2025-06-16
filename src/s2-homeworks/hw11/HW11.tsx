// HW11.tsx
import React, { useState } from 'react';
import s from './HW11.module.css';
import s2 from '../../s1-main/App.module.css';
import { restoreState } from '../hw06/localStorage/localStorage';
import SuperRange from './common/c7-SuperRange/SuperRange';

function HW11() {
    const [value1, setValue1] = useState(restoreState<number>('hw11-value1', 0));
    const [value2, setValue2] = useState(restoreState<number>('hw11-value2', 100));
    const MAX_VALUE = 100; // Определим максимум, если он используется

    const change = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            // Изменился двойной слайдер
            const [newVal1, newVal2FromSlider] = newValue;

            setValue1(newVal1);

            // Если новый newVal1 изменился, И value2 (старое значение) было на максимуме,
            // попробуем "обновить" value2 его же значением, чтобы MUI точно перерендерил ползунок.
            // Это актуально, если newVal1 < value2 (т.е. левый ползунок сдвинулся влево от правого, который был на MAX_VALUE)
            if (value2 === MAX_VALUE && newVal1 < value2) {
                // Мы ожидаем, что newVal2FromSlider от MUI Slider тоже будет MAX_VALUE в этом случае
                // из-за disableSwap, если правый ползунок не двигался.
                setValue2(newVal2FromSlider); // или setValue2(MAX_VALUE)
            } else {
                setValue2(newVal2FromSlider);
            }

        } else {
            // Изменился одиночный слайдер
            setValue1(newValue as number);
            // value2 не трогаем, согласно упрощенной логике
        }
    };

    return (
        <div id={'hw11'}>
            <div className={s2.hwTitle}>Homework #111111111</div>
            <div className={s2.hw}>
                <div className={s.container}>
                    <div className={s.wrapper}>
                        <span id={'hw11-value'} className={s.number}>{value1}</span>
                        <SuperRange
                            id={'hw11-single-slider'}
                            value={value1}
                            onChange={change}
                            max={MAX_VALUE} // Передаем max, если он не дефолтный 100
                        />
                    </div>
                    <div className={s.wrapper}>
                        <span id={'hw11-value-1'} className={s.number}>{value1}</span>
                        <SuperRange
                            id={'hw11-double-slider'}
                            value={[value1, value2]}
                            onChange={change}
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