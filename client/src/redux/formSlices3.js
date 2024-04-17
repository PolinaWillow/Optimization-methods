import {createSlice} from '@reduxjs/toolkit'

const formSlice3 = createSlice({
    name: 'form3',
    initialState: {
        mu: 0,
        eps: 0,
        X01: 0,
        X02: 0,
    },
    reducers: {
        addValue(state, action){ //action передает все, что нужно для работы
            //console.log(action.payload)
            for(let key in state){
                if(key===action.payload.nameBlock){
                    state[key] = action.payload.value;
                }
            }
        },
    }
})

export const {addValue} = formSlice3.actions; //Actions создаются автоматически, нужно просто достать через деструкторизацию
export default formSlice3.reducer; //Формирование reduser из набора методов из redusers