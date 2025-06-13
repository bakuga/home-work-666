import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppStoreType} from './bll/store'
import {loadingAC} from './bll/loadingReducer' // Убедитесь, что импорт корректен
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import s2 from '../../s1-main/App.module.css'
import {Loader} from './Loader' // Предполагаем, что Loader.tsx будет создан

/*
* 1 - в файле loadingReducer.ts дописать типы и логику (СДЕЛАНО ВЫШЕ)
* 2 - получить isLoading из редакса
* 3 - дописать функцию setLoading
* 4 - сделать стили в соответствии с дизайном
* */

const HW10 = () => {
    // 2 - получить isLoading из редакса
    const isLoading = useSelector<AppStoreType, boolean>(state => state.loading.isLoading)
    const dispatch = useDispatch()

    const setLoading = () => { // 3 - дописать функцию setLoading
        dispatch(loadingAC(true)) // Показать крутилку

        setTimeout(() => {
            dispatch(loadingAC(false)) // Убрать крутилку через 1.5 секунды
        }, 1500)
    }

    return (
        <div id={'hw10'}>
            <div className={s2.hwTitle}>Homework #10</div>

            <div className={s2.hw}>
                {isLoading ? (
                    <div id={'hw10-loading'}>
                        <Loader/>
                    </div>
                ) : (
                    <SuperButton
                        id={'hw10-button-start-loading'}
                        onClick={setLoading}
                        // xType={'default'} // Если 'default' дает синий цвет кнопки, как на дизайне
                        // или другой xType, отвечающий за синий цвет
                    >
                        Set loading...
                    </SuperButton>
                )}
            </div>
        </div>
    )
}

export default HW10