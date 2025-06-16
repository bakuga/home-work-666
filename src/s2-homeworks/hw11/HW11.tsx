import React, { useState } from 'react';
import s from './HW11.module.css';
import s2 from '../../s1-main/App.module.css';
import { restoreState } from '../hw06/localStorage/localStorage';
import SuperRange from './common/c7-SuperRange/SuperRange';

/*
* 1 - передать значения в оба слайдера +
* 2 - дописать типы и логику функции change +
* 3 - сделать стили в соответствии с дизайном +
* */

function HW11() {
    // Восстанавливаем значения из localStorage или используем дефолтные
    const [value1, setValue1] = useState(restoreState<number>('hw11-value1', 0));
    const [value2, setValue2] = useState(restoreState<number>('hw11-value2', 100));

    const change = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            // Изменился двойной слайдер
            // MUI Slider с prop disableSwap сам гарантирует, что newValue[0] <= newValue[1]
            const [newVal1, newVal2] = newValue;
            setValue1(newVal1);
            setValue2(newVal2);
        } else {
            // Изменился одиночный слайдер (newValue - это новое значение для value1)
            const newSingleValue = newValue as number;

            // Обновляем value1
            setValue1(newSingleValue);

            // Если новое значение value1 (newSingleValue) стало больше текущего value2,
            // то value2 должен "подтянуться" к newSingleValue.
            // Это гарантирует, что левый ползунок двойного слайдера не "перепрыгнет"
            // правый, если одиночный слайдер двигает value1 за пределы value2.
            if (newSingleValue > value2) {
                // value2 здесь - это значение из предыдущего состояния/рендера.
                setValue2(newSingleValue);
            }
            // Если newSingleValue <= value2, то value2 не нужно изменять
            // в ответ на движение одиночного слайдера; он изменится только
            // если пользователь будет двигать ползунки двойного слайдера.
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
                            max={100}
                        />
                    </div>

                    <div className={s.wrapper}>
                        <span id={'hw11-value-1'} className={s.number}>{value1}</span>
                        <SuperRange
                            id={'hw11-double-slider'}
                            value={[value1, value2]} // Всегда передаем массив [value1, value2]
                            onChange={change} // Эта функция уже обрабатывает массив
                            min={0}
                            max={100}
                            disableSwap // Важный prop для MUI Slider, чтобы ползунки не менялись местами
                        />
                        <span id={'hw11-value-2'} className={s.number}>{value2}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HW11;