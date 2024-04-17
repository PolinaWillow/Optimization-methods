import { Navbar } from "../Navbar/navbar"
import axios from 'axios'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addValue } from '../../redux/formSlices3';
import "./BarrierFunctions.css"


export const BarrierFunctions=()=>{
    const [newValue, setNewValue] = useState({nameBlock: '', value:''})
    const [flagResult, setFlagResult] = useState(false)

    const form = useSelector(state=>state.form3)

    const dispatch = useDispatch()

    const addNewValue = () => { 
        dispatch(addValue(newValue)) 
    }

    const changeHandler = (e)=>{
        setNewValue({nameBlock: e.target.name, value: e.target.value})
        setFlagResult(false);
    }

    const [errResults, setErrResults] = useState({"error": false, "mas": "" })
    const [results, setResults] = useState([]);
    const [optimum, setOptimum] = useState({})

    const Click=(e)=>{
        e.preventDefault();
        console.log(form);

        try {
            axios.post(`http://localhost:7000/api/barrierfunctions`, {...form}
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

    return (
       
            <div className={`dataBlock`}>
                <Navbar activName = "BarrierFunctions"/>
    
                <h1>Методы многомерной оптимизации</h1>
                <h2>Метод барьерных функций</h2>
                <form>
                    <div className="flex justify-space-between inputBlock">
                        
                        <div className="selector mg-1">
                            <p className="mg-top-1">Функция F(X):</p>
                            <p>MIN F(x<sub>1</sub>, x<sub>2</sub>) = (x<sub>1</sub> - 5)<sup>2</sup> + (x<sub>2</sub> - 3)<sup>2</sup></p>
                            <p className="mg-top-1">При условаиях:</p>
                            <div className="FuncCondition">
                                <p>-x<sub>1</sub> + 2x<sub>2</sub> {"<"}= 4</p>
                                <p>x<sub>1</sub> + x<sub>2</sub> {"<"}= 3</p>
                            </div>
                        </div>
                    </div>

                    <div className='inputBlock mg-1'>
                    
                        <h4>Параметры:</h4>
                        <div className="inputParams flex justify-space-between">
                           
                            <div>
                                <div className="mg-top-1">
                                        <lable className="block">Параметр &mu;:</lable>
                                        <input className="inputParamsText" autoComplete="off" type="text" name="mu" id="mu"  onChange={changeHandler} onBlur={addNewValue}/>
                                </div>
                                <div className="mg-top-1">
                                        <lable className="block">Точность вычислений &epsilon;:</lable>
                                        <input className="inputParamsText" autoComplete="off" type="text" name="eps" id="eps"  onChange={changeHandler} onBlur={addNewValue}/>
                                </div>
                            </div>

                            <div>
                                <lable>Начальная точка X<sub>0</sub>:</lable>
                                <div className="mg-top-1">
                                    <lable>X<sub>01</sub>:</lable>
                                    <input className="inputParamsText" autoComplete="off"  type="text" name="X01" id="X01" onChange={changeHandler} onBlur={addNewValue}/>
                                </div>
                                <div className="mg-top-1">
                                    <lable>X<sub>02</sub>:</lable>
                                    <input className="inputParamsText" autoComplete="off" type="text" name="X02" id="X02" onChange={changeHandler} onBlur={addNewValue}/>
                                </div>
                            </div>
                        </div>
                </div>
    
                    <div className="flex justify-center ">
                        <input type="submit" className="btn" value="Расчитать" onClick={Click} />
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
                                <th scope="col">&mu;<sub>k</sub></th>
                                <th scope="col">X</th>
                                <th scope="col">F(X)</th>
                                <th scope="col">B(X)</th>
                                <th scope="col">Q(X)</th>
                                <th scope="col">&mu;B(X)</th>
                                </tr>
                            </thead>
                            <tbody>
                            {results.map((elem, index)=>
                                <tr key={index}>
                                    <th scope="row">{elem.k}</th>
                                    <td>{elem.mu}</td>
                                    <td>{elem.Xk}</td>
                                    <td>{elem.FXk}</td>
                                    <td>{elem.BXk}</td>
                                    <td>{elem.QXk}</td>
                                    <td>{elem.muBXk}</td>
                                    
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {!errResults.error &&
                        <>
                            <h3>Ответ:</h3>
                            <div className='endResults'>
                                <p>Оптимальное значение аргумента: {optimum.X}</p>
                                <p>Оптимальное значение функции: {optimum.FX}</p>
                            </div>
                            
                        </>
                    }
                </div>
            }
    
            </div>
    )
}