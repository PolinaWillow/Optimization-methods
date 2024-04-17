import {configureStore} from '@reduxjs/toolkit'
import formReduser from './slices'
import form2Reduser from './formSlices2'
import form3Reduser from './formSlices3'

//Конфигурируем Store
export default configureStore({
    reducer: {  //Подключение reduser из redusers.js
        form: formReduser,
        form2: form2Reduser,
        form3: form3Reduser,
    }
}) 