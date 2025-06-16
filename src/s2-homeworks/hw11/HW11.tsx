import { useState } from 'react'
import s from './HW11.module.css'
import s2 from '../../s1-main/App.module.css'
import { restoreState } from '../hw06/localStorage/localStorage'
import SuperRange from './common/c7-SuperRange/SuperRange'


function HW11() {
    const [value1, setValue1] = useState(restoreState<number>('hw11-value1', 0));
    const [value2, setValue2] = useState(restoreState<number>('hw11-value2', 100));

    const change = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            // Изменился двойной слайдер
            // MUI с disableSwap гарантирует, что newValue[0] <= newValue[1]
            setValue1(newValue[0]);
            setValue2(newValue[1]);
        } else {
            // Изменился одиночный слайдер
            const newSingleSliderValue = newValue as number;

            // Если новое значение value1 (от одиночного слайдера)
            // пытается "перепрыгнуть" через текущее value2,
            // то value2 должен "подтянуться" к этому новому значению.
            // Оба значения становятся равными.
            if (newSingleSliderValue > value2) { // value2 здесь - это значение из предыдущего состояния
                setValue1(newSingleSliderValue);
                setValue2(newSingleSliderValue);
            } else {
                // В противном случае (newSingleSliderValue <= value2),
                // меняется только value1. value2 остается на месте.
                setValue1(newSingleSliderValue);
                // setValue2(value2); // Нет необходимости вызывать setValue2, если оно не меняется
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
                            value={[value1, value2]} // Всегда передаем массив [value1, value2]
                            onChange={change}
                            min={0}
                            max={100}
                            disableSwap // Важный проп для MUI Slider
                        />
                        <span id={'hw11-value-2'} className={s.number}>{value2}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HW11;