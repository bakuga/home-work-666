import React, {useState, useEffect} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

export const Clock = ()=> {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    const start = () => {
        // остановить предыдущий таймер, если он уже был запущен
        if (timerId !== undefined) {
            clearInterval(timerId);
        }
        // запустить новый таймер
        const id: number = window.setInterval(() => {
            setDate(new Date()); // Обновляем 'date' текущим временем
        }, 1000);
        setTimerId(id); // Сохраняем ID таймера
    }

    const stop = () => {
        if (timerId !== undefined) {
            clearInterval(timerId); // Останавливаем таймер
            setTimerId(undefined); // Сбрасываем ID таймера
        }
    }

    // Эффект для очистки таймера при размонтировании компонента
    useEffect(() => {
        return () => {
            if (timerId !== undefined) {
                clearInterval(timerId);
            }
        };
    }, [timerId]); // Зависимость от timerId, чтобы эффект перезапускался при его изменении

    const onMouseEnter = () => {
        setShow(true); // Показать дату
    }
    const onMouseLeave = () => {
        setShow(false); // Спрятать дату
    }

    // Вспомогательная функция для добавления ведущего нуля
    const getFormattedPart = (value: number): string => {
        return value < 10 ? '0' + value : String(value);
    }

    // 2 - Вычисление строк времени и даты
    // часы24:минуты:секунды (01:02:03)/(23:02:03)/(00:00:01)
    const stringTime = `${getFormattedPart(date.getHours())}:${getFormattedPart(date.getMinutes())}:${getFormattedPart(date.getSeconds())}`;

    // день.месяц.год (01.02.2022)
    const stringDate = `${getFormattedPart(date.getDate())}.${getFormattedPart(date.getMonth() + 1)}.${date.getFullYear()}`;

    // день недели на английском, месяц на английском
    const stringDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    const stringMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/> {/* Пустая строка или <br/> для сохранения высоты */}
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={timerId !== undefined} // 3 - Дизейблить если таймер запущен
                    onClick={start}
                    // xType можно подобрать для синего цвета, если 'default' не подходит
                >
                    Start {/* Текст с большой буквы как на картинке */}
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={timerId === undefined} // 3 - Дизейблить если таймер не запущен
                    onClick={stop}
                    // xType можно подобрать для светло-голубого, например 'secondary'
                    // или оставить по умолчанию, если он подходит
                >
                    Stop {/* Текст с большой буквы как на картинке */}
                </SuperButton>
            </div>
        </div>
    )
}
