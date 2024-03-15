import {configureStore} from '@reduxjs/toolkit'
import formReduser from './slices'
import form2Reduser from './formSlices2'

//Конфигурируем Store
export default configureStore({
    reducer: {  //Подключение reduser из redusers.js
        form: formReduser,
        form2: form2Reduser,
    }
}) 