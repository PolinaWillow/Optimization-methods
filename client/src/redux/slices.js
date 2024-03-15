import {createSlice} from '@reduxjs/toolkit'

const formSlice = createSlice({
    name: 'form',
    initialState: {
        method: "",
        funct: "",
        optimum: "",
        e: 0,
        l: 0,
        a: 0,
        b: 0,
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

export const {addValue} = formSlice.actions; //Actions создаются автоматически, нужно просто достать через деструкторизацию
export default formSlice.reducer; //Формирование reduser из набора методов из redusers