const {Router} = require('express')
const router = Router()

const dichotomousSearch = require('../functions/DichotomousSearch')
const goldenSection = require('../functions/GoldenSection')
const fibonacciMethod = require('../functions/FibonacciMethod')

const rosenbrock = require('../functions/Rosenbrock')

router.post('/optimization',[], async (req, res) => {
    console.log('Body: ' + req.body)
    try {
        
        let { method, funct, optimum, e, l, a, b,} = req.body

        //Преобразование к плавающей точке
        e = e.toString().replace(',', '.');
        l = l.toString().replace(',', '.');
        a = a.toString().replace(',', '.');
        b = b.toString().replace(',', '.'); 

        switch (method){
            case 'DichotomousSearch': {
                if(optimum === 'max'){
                    let results = dichotomousSearch.MAX(Number(e), Number(l), Number(a), Number(b), funct)
                    //console.log(results)
                    return res.status(200).json(results)
                }
                else if(optimum === 'min'){
                    let results = dichotomousSearch.MIN(Number(e), Number(l), Number(a), Number(b), funct)
                    //console.log(results)
                    return res.status(200).json(results)
                }
                else return res.status(500).json({message: "Неизвестный код оптимума"})
            } 
            case 'GoldenSection':{
                if(optimum === 'max'){
                    let results = goldenSection.MAX(Number(l), Number(a), Number(b), funct)
                    //console.log(results)
                    return res.status(200).json(results)
                }
                else if(optimum === 'min'){
                    let results = goldenSection.MIN(Number(l), Number(a), Number(b), funct)
                    //console.log(results)
                    return res.status(200).json(results)
                }
                else return res.status(500).json({message: "Неизвестный код оптимума"})
            }
            case "FibonacciMethod": {
                if(optimum === 'max'){
                    let results = fibonacciMethod.MAX(Number(e), Number(l), Number(a), Number(b), funct)
                    //console.log(results)
                    return res.status(200).json(results)
                }
                else if(optimum === 'min'){
                    let results = fibonacciMethod.MIN(Number(e), Number(l), Number(a), Number(b), funct)
                    //console.log(results)
                    return res.status(200).json(results)
                }
                else return res.status(500).json({message: "Неизвестный код оптимума"})
            }
            default: {
                return res.status(500).json({message: "Неизвестный код метода"})
            }
        }

    } catch (error) {
        return res.status(error).json({message: "Неизвестная ошибка"})
    }
})

router.post('/multioptimization',[], async (req, res) => {
    console.log('Body: ' + req.body)
    try {
        
        let { X01, X02, eps, functId, optimum} = req.body

        if(!X01 || !X02) return res.status(400).json({message: "Не введена начальная точка"})
        if(!eps) return res.status(400).json({message: "Не введена точность вычислений"})
        if(!functId) return res.status(400).json({message: "Не выбрана функция"})
        if(!optimum) return res.status(400).json({message: "Не выбран искомый оптимум"})

        //Преобразование к плавающей точке
        X01 =  X01.toString().replace(',', '.');
        X02 =  X02.toString().replace(',', '.');
        eps = eps.toString().replace(',', '.');

       
        let results = rosenbrock.Optimum(Number(eps), Number(X01), Number(X02), functId, optimum)
        return res.status(200).json(results)

    } catch (error) {
        return res.status(error).json({message: "Неизвестная ошибка"})
    }
})

module.exports = router