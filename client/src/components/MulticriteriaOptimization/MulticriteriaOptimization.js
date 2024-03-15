import { Navbar } from "../Navbar/navbar"
import axios from 'axios'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addValue } from '../../redux/formSlices2';

import './MulticriteriaOptimization.css'

export const MulticriteriaOptimization = ()=>{
    const [newValue, setNewValue] = useState({nameBlock: '', value:''})
    const [flagResult, setFlagResult] = useState(false)
    const [changeMethod, setChangeMethod] = useState("")

    const form = useSelector(state=>state.form2)

    const dispatch = useDispatch()

    const addNewValue = () => { 
        dispatch(addValue(newValue)) 
    }

    const changeHandler = (e)=>{
        if( e.target.type==='radio'){
            setNewValue({nameBlock: e.target.name, value: e.target.id})
        }
        else setNewValue({nameBlock: e.target.name, value: e.target.value})

        if(e.target.name==="method") setChangeMethod(e.target.value)

        setFlagResult(false);
    }

    const [errResults, setErrResults] = useState({"error": false, "mas": "" })
    const [results, setResults] = useState([]);
    const [optimum, setOptimum] = useState({})

    const Click=(e)=>{
        e.preventDefault();
        console.log(form);

        try {
            axios.post(`http://localhost:7000/api/multioptimization`, {...form}
            ).then(function (response) {
                console.log(response.data);
                setErrResults(response.data[0]) //Запись ошибок, если такие есть

                //Запись промежуточных расчетов
                let arr = []
                for(let i=1; i<response.data.length-1;i++){
                    arr.push(response.data[i])
                }

                setResults(arr);
                setOptimum(response.data[response.data.length-1])

                setFlagResult(true);

            }).catch(function (error) {
                alert(error.response.data.message);
            });
                
        } catch (err) {
            return(alert('Что-то пошло не так'))
        }
    }

    return(
        <div className={`dataBlock`}>
            <Navbar activName = "Multidimensional"/>

            <h1>Методы многомерной оптимизации</h1>
            <h2>Метод Розенброка с непрерывным шагом</h2>
            <form>
                <div className="flex justify-space-between inputBlock">
                    <div className="selector mg-1">
                        <lable className="block">Функция F(X):</lable>
                            <select name="functId" id="functions-select" onChange={changeHandler} onBlur={addNewValue}>
                                <option value="">Выбирите функцию</option>
                                <option value="F3">(3X1^2-X2)^2+(2X1-3X2)^2</option>
                                <option value="F4">9X1^2+16X2^2-90X1-128X2</option>
                            </select>
                    </div>
                </div>

                <div className='inputBlock mg-1'>
                    <lable>Искомый оптимум:</lable>
                    <input type="radio" name="optimum" id="max" value="MAX" onChange={changeHandler} onBlur={addNewValue}/>
                    <lable>MAX</lable>
                    <input type="radio" name="optimum" id="min" value="MIN" onChange={changeHandler} onBlur={addNewValue}/>
                    <lable>MIN</lable>
                </div>

                <div className='inputBlock mg-1'>
                    
                        <h4>Параметры:</h4>
                        <div className="inputParams flex justify-space-between">
                           
                            <div>
                                <lable className="block">Точность вычислений eps:</lable>
                                <input className="inputParamsText" autoComplete="off" type="text" name="eps" id="eps" onChange={changeHandler} onBlur={addNewValue}/>
                            </div>

                            <div>
                                <lable>Начальная точка X0:</lable>
                                <div className="mg-top-1">
                                    <lable>X01:</lable>
                                    <input className="inputParamsText" autoComplete="off"  type="text" name="X01" id="X01" onChange={changeHandler} onBlur={addNewValue}/>
                                </div>
                                <div className="mg-top-1">
                                    <lable>X02:</lable>
                                    <input className="inputParamsText" autoComplete="off" type="text" name="X02" id="X02" onChange={changeHandler} onBlur={addNewValue}/>
                                </div>
                            </div>
                        </div>
                </div>

                <div className="flex justify-center ">
                    <input type="submit" className="btn" value="Расчитать" onClick = {Click}/>
                </div>
            </form>

            {flagResult && 
                <div mg-top-10>
                    <hr/>
                    <h2>Результаты расчетов</h2>
                    {errResults.error&&<div className='err'>{errResults.mas}</div>}

                    <div className = "flex justify-center">
                        <table className>
                            <thead className=''>
                                <tr>
                                <th scope="col">K</th>
                                <th scope="col">
                                    <p className="MultiRes_p">Xk</p>
                                    <p className="MultiRes_p">f(Xk)</p>
                                </th>
                                <th scope="col">j</th>
                                <th scope="col">dj</th>
                                <th scope="col">
                                    <p className="MultiRes_p">yj</p>
                                    <p className="MultiRes_p">f(yj)</p>
                                </th>
                                <th scope="col">Lam_j</th>
                                <th scope="col">
                                    <p className="MultiRes_p">yj+del_j*dj</p>
                                    <p className="MultiRes_p">f(yj+del_j*dj)</p>
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                            {results.map((elem, index)=>
                            <>
                                <tr key={index}>
                                    <th scope="row">{elem.k}</th>
                                    <td>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.Xk}</p>
                                        </div>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.FXk}</p>
                                        </div>
                                        
                                    </td>
                                    <td>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j1.j}</p>
                                        </div>
                                        <br/>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j2.j}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j1.Dj}</p>
                                        </div>
                                        <br/>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j2.Dj}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j1.yj}</p>
                                        </div>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j1.Fyj}</p>
                                        </div>
                                        <br/>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j2.yj}</p>
                                        </div>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j2.Fyj}</p>
                                        </div>
                                        
                                    </td>
                                    <td>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j1.lyamj}</p>
                                        </div>
                                        <br/>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j2.lyamj}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j1.yj1}</p>
                                        </div>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j1.Fyj1}</p>
                                        </div>
                                        <br/>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j2.yj1}</p>
                                        </div>
                                        <div className="flex justify-center">
                                            <p className="MultiRes_p">{elem.j2.Fyj1}</p>
                                        </div>
                                        
                                    </td>
                                </tr>
                            </>   
                            )}
                            </tbody>
                        </table>
                    </div>

                    {!errResults.error &&
                        <>
                            <h3>Ответ:</h3>
                            <div className='endResults'>
                                <p>X: {optimum.X}</p>
                                <p>Оптимальное значение функции: {optimum.FX}</p>
                            </div>
                            
                        </>
                    }
                </div>
            }
        </div>
    )
}