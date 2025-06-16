import React, { useState } from 'react';
import s from './HW11.module.css';
import s2 from '../../s1-main/App.module.css';
import { restoreState } from '../hw06/localStorage/localStorage';
import SuperRange from './common/c7-SuperRange/SuperRange';

/*
* 1 - передать значения в оба слайдера +
* 2 - дописать типы и логику функции change +
* 3 - сделать стили в соответствии с дизайном (стили SuperRange и HW11.module.css предоставлены)
* */

function HW11() {
    // for autotests // не менять // можно подсунуть в локалСторэдж нужные числа, чтоб увидеть как они отображаются
    const [value1, setValue1] = useState(restoreState<number>('hw11-value1', 0));
    const [value2, setValue2] = useState(restoreState<number>('hw11-value2', 100));

    // Логика строго по комментарию в исходном задании:
    // "если пришёл массив - сохранить значения в оба useState, иначе в первый"
    const handleChange = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            // Массив пришел от двойного слайдера.
            // MUI Slider с disableSwap должен гарантировать, что newValue[0] <= newValue[1].
            setValue1(newValue[0]);
            setValue2(newValue[1]);
        } else {
            // Одно число пришло от одиночного слайдера.
            setValue1(newValue as number);
            // value2 НЕ изменяется одиночным слайдером, согласно самой простой интерпретации задания.
        }
    };

    return (
        <div id={'hw11'}>
            <div className={s2.hwTitle}>Homework #11</div> {/* Убедимся, что номер ДЗ правильный */}
            <div className={s2.hw}>
                <div className={s.container}>
                    <div className={s.wrapper}>
                        <span id={'hw11-value'} className={s.number}>{value1}</span>
                        <SuperRange
                            id={'hw11-single-slider'}
                            // сделать так чтоб value1 изменялось // пишет студент
                            value={value1}
                            onChange={handleChange}
                            // min и max для одиночного слайдера могут быть дефолтными (0-100 в MUI)
                            // или можно указать явно, если требуется
                            // max={100}
                        />
                    </div>
                    <div className={s.wrapper}>
                        <span id={'hw11-value-1'} className={s.number}>{value1}</span>
                        <SuperRange
                            id={'hw11-double-slider'}
                            // сделать так чтоб value1/2 изменялось // пишет студент
                            value={[value1, value2]}
                            onChange={handleChange}
                            min={0}      // Явно указываем для двойного слайдера
                            max={100}    // Явно указываем для двойного слайдера
                            disableSwap  // Крайне важно для корректной работы двойного MUI Slider
                            // и ожиданий тестов, предотвращает "перепрыгивание" ползунков.
                        />
                        <span id={'hw11-value-2'} className={s.number}>{value2}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HW11;