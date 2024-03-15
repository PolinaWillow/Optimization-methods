import './OneDimensionalOptimization.css'
import { Navbar } from '../Navbar/navbar';
import axios from 'axios'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addValue } from '../../redux/slices';

export const OneDimensionalOptimization = (props) =>{
    const [newValue, setNewValue] = useState({nameBlock: '', value:''})
    const [flagResult, setFlagResult] = useState(false)
    const [changeMethod, setChangeMethod] = useState("")

    const form = useSelector(state=>state.form)

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

    const [results, setResults] = useState([]);
    const [optimum, setOptimum] = useState({'a':0, 'b':0, "opt": 0, "Fopt":0})
    const [errResults, setErrResults] = useState({"error": false, "mas": "" })

    const Click=(e)=>{
        e.preventDefault();
        console.log(form);

        try {
            axios.post(`http://localhost:7000/api/optimization`, {...form}
            ).then(function (response) {
                //console.log(response.data);
                setErrResults(response.data[0]) //Запись ошибок, если такие есть
                setOptimum(response.data[response.data.length-1]) //Запись значения оптимума
                
                //Запись промежуточных расчетов
                let arr = []
                for(let i=1; i<response.data.length-1;i++){
                    arr.push(response.data[i])
                }
                setResults(arr);

            }).catch(function (error) {
                alert(error);
            });
                
        } catch (err) {
            return(alert('Что-то пошло не так'))
        }

        setFlagResult(true);
    }

    return (
        <div className={`${props.className} dataBlock`}>
            <Navbar activName = "OneDimensional"/>

            <h1>Методы одномерной оптимизации</h1>

            <form>
                <div className="flex justify-space-between inputBlock">
                    <div className="selector mg-1">
                        <lable className="block">Метод расчетов:</lable>
                        <select name="method" id="methods-select" onChange={changeHandler} onBlur={addNewValue}>
                            <option value="">Выберите метод</option>
                            <option value="DichotomousSearch">Дихотомический поиск</option>
                            <option value="GoldenSection">Метод золотого сечения</option>
                            <option value="FibonacciMethod">Метод Фибоначи</option>
                        </select>
                    </div>
                    <div className="selector mg-1">
                        <lable className="block">Функция F(X):</lable>
                        <select name="funct" id="functions-select" onChange={changeHandler} onBlur={addNewValue}>
                            <option value="">Выбирите функцию</option>
                            <option value="F1">10*x - x*x +3</option>
                            <option value="F2">(2*x*x+3)/(x*x+2*x-8)</option>
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
                    {changeMethod&&<>
                        <h4>Параметры:</h4>
                        <div className="inputParams flex justify-space-between">
                            {(changeMethod==="DichotomousSearch")&&    
                            <div>
                                <lable className="block">Константа различимости e:</lable>
                                <input className="inputParamsText" autoComplete="off" type="text" name="e" id="e" onChange={changeHandler} onBlur={addNewValue}/>
                            </div>
                            }
                            {(changeMethod==="FibonacciMethod")&&    
                            <div>
                                <lable className="block">Константа размерности e:</lable>
                                <input className="inputParamsText" autoComplete="off" type="text" name="e" id="e" onChange={changeHandler} onBlur={addNewValue}/>
                            </div>
                            }
                            <div>
                                <lable className="block">Конечная длина интервала l:</lable>
                                <input className="inputParamsText" autoComplete="off" type="text" name="l" id="l" onChange={changeHandler} onBlur={addNewValue}/>
                            </div>

                            <div>
                                <lable>Начальный интервал:</lable>
                                <div className="mg-top-1">
                                    <lable>a:</lable>
                                    <input className="inputParamsText" autoComplete="off"  type="text" name="a" id="a" onChange={changeHandler} onBlur={addNewValue}/>
                                </div>
                                <div className="mg-top-1">
                                    <lable>b:</lable>
                                    <input className="inputParamsText" autoComplete="off" type="text" name="b" id="b" onChange={changeHandler} onBlur={addNewValue}/>
                                </div>
                            </div>
                        </div>
                    </>}   

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
                                <th scope="col">a</th>
                                <th scope="col">b</th>
                                <th scope="col">lam</th>
                                <th scope="col">nu</th>
                                <th scope="col">F(lam)</th>
                                <th scope="col">F(nu)</th>
                                </tr>
                            </thead>
                            <tbody>
                            {results.map((elem, index)=>
                                <tr key={index}>
                                    <th scope="row">{elem.k}</th>
                                    <td>{elem.a}</td>
                                    <td>{elem.b}</td>
                                    <td>{elem.lam}</td>
                                    <td>{elem.nu}</td>
                                    <td>{elem.fl}</td>
                                    <td>{elem.fn}</td>
                                    
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {!errResults.error &&
                        <>
                            <h3>Ответ:</h3>
                            <div className='endResults'>
                                <p>a: {optimum.a}</p>
                                <p>b: {optimum.b}</p>
                                <p>Оптимальное значение аргумента: {optimum.opt}</p>
                                <p>Оптимальное значение функции: {optimum.F}</p>
                                <p>Всего итераций: {results.length+1}</p>
                            </div>
                            
                        </>
                    }
                </div>
            }
        </div>
    )
}