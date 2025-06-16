import React, {useEffect, useState} from 'react'
import s from './HW11.module.css'
import {restoreState, saveState} from '../hw06/localStorage/localStorage'
import SuperRange from "./common/c7-SuperRange/SuperRange";

function HW11() {
    const [value1, setValue1] = useState(() => restoreState<number>('hw11-value1', 0))
    const [value2, setValue2] = useState(() => Math.min(restoreState<number>('hw11-value2', 100), 98))

    // Фикс на случай, если в localStorage сохранено 99 или 100
    useEffect(() => {
        if (value2 > 98) {
            setValue2(98)
            saveState<number>('hw11-value2', 98)
        }
    }, [])

    const change = (event: Event, value: number | number[]) => {
        if (typeof value === 'number') {
            setValue1(value)
            saveState<number>('hw11-value1', value)
        } else if (Array.isArray(value)) {
            const [newVal1, newVal2] = value
            setValue1(newVal1)
            setValue2(newVal2)
            saveState<number>('hw11-value1', newVal1)
            saveState<number>('hw11-value2', newVal2)
        }
    }

    return (
        <div id={'hw11'}>
            <div className={s.hwTitle}>Homework 11</div>
            <div className={s.hw}>
                <div className={s.sliderBlock}>
                    <span id={'hw11-value'} className={s.number}>{value1}</span>
                    <SuperRange
                        id={'hw11-single-slider'}
                        value={value1}
                        onChange={change}
                        min={0}
                        max={99}
                    />
                </div>

                <div className={s.sliderBlock}>
                    <span className={s.number}>{value1}</span>
                    <SuperRange
                        id={'hw11-double-slider'}
                        value={[value1, value2]}
                        onChange={change}
                        min={0}
                        max={99}
                        disableSwap
                    />
                    <span className={s.number}>{value2}</span>
                </div>
            </div>
        </div>
    )
}

export default HW11











/*
import React, { useState } from 'react'
import s from './HW11.module.css'
import s2 from '../../s1-main/App.module.css'
import { restoreState } from '../hw06/localStorage/localStorage'
import SuperRange from './common/c7-SuperRange/SuperRange'

/!*
* 1 - передать значения в оба слайдера
* 2 - дописать типы и логику функции change
* 3 - сделать стили в соответствии с дизайном
* *!/

/!*function HW11() {
    const [value1, setValue1] = useState(restoreState<number>('hw11-value1', 0))
    const [value2, setValue2] = useState(restoreState<number>('hw11-value2', 100))

    const change = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            // Изменился двойной слайдер
            const [newVal1, newVal2] = newValue;
            setValue1(newVal1); // value1 (и для одиночного, и для двойного)
            setValue2(newVal2); // value2 (только для двойного)
        } else {
            // Изменился одиночный слайдер
            // Его значение newValue (это новое значение для value1)
            // Мы должны убедиться, что value1 не превышает value2,
            // но и value2 не должен "убегать" от value1, если это не требуется.

            // Если одиночный слайдер меняет value1, то левый край двойного слайдера
            // также должен измениться на это значение.
            // Правый край (value2) остается неизменным, если newValue (новый value1) не превышает его.
            // Если newValue (новый value1) становится больше value2,
            // то value2 должен стать равным newValue, чтобы диапазон оставался валидным
            // (т.е. левый ползунок не может быть правее правого).

            const newSingleValue = newValue as number;
            setValue1(newSingleValue);

            // Синхронизация: если одиночный value1 стал больше текущего value2,
            // то value2 подтягивается к value1.
            // Это соответствует поведению, где ползунки не пересекаются на двойном слайдере.
            if (newSingleValue > value2) {
                setValue2(newSingleValue);
            }
        }
    }*!/

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
                            max={100}
                            disableSwap // Важный проп для MUI Slider, чтобы ползунки не менялись местами
                        />
                        <span id={'hw11-value-2'} className={s.number}>{value2}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HW11*/
