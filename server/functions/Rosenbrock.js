class Rosenbrock {
    results = [{"error": false, "mas": "" }];
    
    F3(X1, X2){return(Math.pow((3*Math.pow(X1,2)-X2),2)+Math.pow((2*X1-3*X2),2))}
    F4(X1, X2){return(9*Math.pow(X1,2)+16*Math.pow(X2,2)-90*X1-128*X2)}

    F(X1, X2, funcId){
        let res
        if(funcId=='F3') res = this.F3(X1, X2)
        if(funcId=='F4') res = this.F4(X1, X2)
        //console.log(res)
        return res
    }

    FindFunction(funcId, y1, y2, dj, j, x){
        let s=0;
        let result
        if(funcId==='F3'){
            let x1 = y1 + x * dj[j - 1][s]
            let x2 = y2 + x * dj[j - 1][s + 1]
            result = this.F3(x1, x2)//(3 * (y1 + x * dj[j - 1][s])^2 - (y2 + x * dj[j - 1][s + 1]))^2 + (2 * (y1 + x * dj[j - 1][s])) - (3 * (y2 + x * dj[j - 1][s + 1]))^2
            
            // if(j==2){
            //     console.log(`j = ${j}; x1: ${x1}`)
            //     console.log(`j = ${j}; y1: ${y1}`)
            //     console.log(`j = ${j}; x: ${x}`)
            //     console.log(`j = ${j}; x * dj[j - 1][s]: ${dj[j - 1][s]}`)
            //     console.log(`j = ${j}; x * dj[j - 1][s]: ${dj[j - 1][s]}`)
            //     console.log(`j = ${j}; x2: ${x2}`)
            //     console.log(`j = ${j}; y2: ${y2}`)
            //     console.log(`j = ${j}; x: ${x}`)
            //     console.log(`j = ${j}; dj[j - 1][s+1]: ${dj[j - 1][s+1]}`)
            //     console.log(`j = ${j}; x * dj[j - 1][s+1]: ${x * dj[j - 1][s+1]}`)
                
            //     console.log(`j = ${j}; FindFunction: ${result}`)
            // }
            
            
            return result
        }
        if(funcId==='F4'){
            let x1 = y1 + x * dj[j - 1][s]
            let x2 = y2 + x * dj[j - 1][s + 1]
            result = this.F4(x1, x2)//9*(y1 + x * dj[j - 1][s])^2+16*(y2 + x * dj[j - 1][s + 1])^2-90*(y1 + x * dj[j - 1][s])-128*(y2 + x * dj[j - 1][s + 1])
            return result
        }

    }

    //Процедура Грамма-Шмидта для построения направлений
    GramSchmidt(k, lyamPrev1, lyamPrev2, dj){
        // console.log("Gram-shmit ")
        let bj = [[],[]]
        let aj = [0,0]
        let lyam = [lyamPrev1, lyamPrev2]

        // console.log(`0 lyam: ${lyam}`)
        // console.log(`0 aj: ${aj}`)
        // console.log(`0 dj: ${dj}`)


        for(let j=0;j<2;j++){
            //console.log(`j: ${j}`)
            for(let s=0;s<2;s++){
                if(lyam[s] === 0 ) {
                    // console.log(`lyam[s] === 0 aj: ${aj[j]}`)
                    aj[j] = dj[j][s]
                    // console.log(`lyam[s] === 0 aj: ${aj[j]}`)
                }
                else {
                    // console.log(`lyam[s] != 0 aj: ${aj[j]}`)
                    // console.log(`lyam[s] != 0 lyam[j]: ${lyam[j]}`)
                    // console.log(`lyam[s] != 0 dj[s]: ${dj[j][s]}`)
                    // console.log(`lyam[s] != 0 lyam[j]*dj[s]: ${lyam[j]*dj[j][s]}`)
                    // console.log(`lyam[s] != 0 aj[j]+ lyam[j]*dj[s]: ${aj[j]+ lyam[j]*dj[j][s]}`)
                    aj[j] = aj[j]+ lyam[j]*dj[j][s]
                    // console.log(`lyam[s] != 0 aj: ${aj[j]}`)
                }

            }
            // console.log(`0 aj: ${aj}`)
        }

        // console.log(`1 aj: ${aj}`)

        let sum = [0,0]
        let l_dj = [0,0]
        let l_bj= [0,0]

        for(let j=0;j<2;j++){
            l_dj[j] = Math.sqrt(Math.pow(dj[j][0], 2) + Math.pow(dj[j][1], 2));
            for (let s = 0; s < 2; s++)
            {
                sum[j] = sum[j] + (aj[s] * dj[j][s]) * dj[j][s];
            }
        }
        // console.log(`2 l_dj: ${l_dj}`)
        // console.log(`2 sum: ${sum}`)
        
        
        for (let j = 0; j < 2; j++){
            for (let s = 0; s < 2; s++){
                if (j == 0) bj[j][s] = aj[s];
                else bj[j][s] = aj[s] - (sum[j - 1] + sum[j]);
            }
        }
        // console.log(`3 bj: ${bj}`)

        
        for (let j = 0; j < 2; j++)
        {
            l_bj[j] = Math.sqrt(Math.pow(bj[j][0], 2) + Math.pow(bj[j][1], 2));
        }
        // console.log(`4 l_bj: ${l_bj}`)

        for (let j = 0; j < 2; j++)
        {
            for (let s = 0; s < 2; s++)
            {
                dj[j][s] = bj[j][s] / l_bj[j];
                aj[j] = 0;
                bj[j][s] = 0;
            }
        }
        // console.log(`4 dj: ${dj}`)
        // console.log(`4 aj: ${aj}`)
        // console.log(`4 aj: ${aj}`)

        return dj
    }

    GoldenSection(y1, y2, Dj, j, funcId){
        let l = 0.01
        let alpha = 0.618
        let a = -5;
        let b = 5;
        let k = 1;
        let lyam = a + (1 - alpha) * (b - a);
        let mu = a + alpha * (b - a);

        // if(j==2) console.log(mu)

        let fl = this.FindFunction(funcId, y1, y2, Dj, j, lyam)
        let fm = this.FindFunction(funcId, y2, y2, Dj, j, mu)

        k++;
        while((b-a)>=l){
            if (fl > fm){
                a = lyam;
                lyam = mu;
                fl = fm;
                mu = a + alpha * (b - a);
                fm = this.FindFunction(funcId, y1, y2, Dj, j, mu)

                // if(j==2){
                //     console.log("fl > fm")
                //     console.log("a " +a);
                //     console.log("lyam " + lyam);
                //     console.log("mu " +mu);
                //     console.log("fm " +fm);
                //     console.log();
                // }

                
            }else{
                b = mu;
                mu = lyam;
                fm = fl;
                lyam = a + (1 - alpha) * (b - a);

                fl = this.FindFunction(funcId, y1, y2, Dj, j, lyam)
                // if(j==2){
                //     console.log("fl < fm")
                //     console.log("b " +b);
                //     console.log("mu " + mu);
                //     console.log("lyam " +lyam);
                //     console.log("fl " +fl);
                //     console.log();
                // }

                

            }
        }
        // console.log((b+a)/2)
        let rez = (b+a)/2
        return rez
    
    }

    Optimum(eps, x01, x02, funcId, optimumId){
        this.ClearResults()

        let lyam;
        let lyamPrev1 = 0;
        let lyamPrev2 = 0;
        let xPrev = [10000, 10000]; //Предыдущее значение X

        let d1 = [1, 0]
        let d2 = [0, 1]

        let Dj = [Array.from(d1), Array.from(d2)]

        //Начальный этап
        let k = 0; //счетчик по Х1	
        let j = 1; //счетчик по Х2
        let n = 2; //Количество переменных в функции

        let X = [x01, x02]
        let y = Array.from(X)

        //Основной этап
        while((Math.abs(X[0]-xPrev[0])>eps)||(Math.abs(X[1]-xPrev[1])>eps)){
            // console.log(`Math.abs(X[0]-xPrev[0]): ${Math.abs(X[0]-xPrev[0])}`)
            // console.log(`Math.abs(X[1]-xPrev[1]): ${Math.abs(X[1]-xPrev[1])}`)
            // console.log(`X[1]: ${X[1]}`)
            // console.log(`xPrev[1]: ${xPrev[1]}`)
            // console.log(`X[0]: ${X[0]}`)
            // console.log(`xPrev[0]: ${xPrev[0]}`)
            // console.log(`eps: ${eps}`)

            // console.log(``)

            //Запоминаем текущее значение X
            xPrev = Array.from(X);
            y = Array.from(X)
            
            // console.log(`xPrev: ${xPrev}`)
            // console.log(`y: ${y}`)
            // console.log(``)

            k++

            //Построение нового множества линейно независимых и взаимно ортогональных направлений в соответствии с процедурой Грамма-Шмидтта
            if(k>1){
                // console.log('////////////////////////////////////')
                // console.log(`Dj: ${Dj}; lyamPrev1: ${lyamPrev1}; lyamPrev2: ${lyamPrev2}`)
                Dj = this.GramSchmidt(k, lyamPrev1, lyamPrev2, Dj)
                // console.log(`Dj: ${Dj}; lyamPrev1: ${lyamPrev1}; lyamPrev2: ${lyamPrev2}`)
                // console.log(``)
                // console.log('////////////////////////////////////')
            }
            j=1;
            while(j<=n){
                //Поиск оптимального решения задачи минимизации
                lyam = this.GoldenSection(y[0], y[1], Dj, j, funcId);
                // console.log(`j: ${j}, lyam_j: ${lyam}`)
                let s = 0;

                //Посик y для lyam
                let yLyam = [0, 0]
                yLyam[0] = y[0] + lyam * Dj[j-1][s];
                yLyam[1] = y[1] + lyam * Dj[j-1][s+1];
                // console.log(`j: ${j}, yLyam: ${yLyam}`)

                if(j==1) lyamPrev1 = lyam;
                else if(j==2) lyamPrev2 = lyam;

                // console.log(`j: ${j}, lyamPrev1: ${lyamPrev1}`)
                // console.log(`j: ${j}, lyamPrev2: ${lyamPrev2}`)

                //Определяем y[j+1]
                y[0] = yLyam[0];
                y[1] = yLyam[1];

                // console.log(`j: ${j}, y: ${y}`)
                // console.log(``)

                //Добавление промежуточных результатов
                //console.log(`K: ${k}; Xk: (${X[0].toFixed(3)};${X[1].toFixed(3)}); f(X): ${this.F(X[0],X[1], funcId).toFixed(3)}; lyam: ${lyam.toFixed(3)}; Dj ${Dj}; Yj: (${y[0].toFixed(3)};${y[1].toFixed(3)}), Ylyam: ${yLyam}; j:${j};`)
                this.AddResult(k, X, funcId, j,  lyam, Dj, y, yLyam)

                j++;
            }

            //Получение X итерации k+1
            X = Array.from(y)
        }

        //Добавление итоговых рекльтатов
        this.AddResult(-1, X, funcId)
        console.log(this.results) 
        console.log(`X: ${X}`)
        //Возврат результатов пользователю
        return this.results
    }

    AddResult(k, X, funcId, j=0,  lyam = 0, Dj = 0, yj = 0, yLyam = 0){
        if(j==1){
            let newData = {
                'k': k,
                'Xk': `(${X[0].toFixed(3)}; ${X[1].toFixed(3)})`,
                'FXk': this.F(X[0],X[1], funcId).toFixed(3),
                'j1': {
                    'j': 1,
                    'Dj': `(${(Dj[0][0]).toFixed(3)}; ${(Dj[0][1]).toFixed(3)})`,
                    'lyamj': lyam.toFixed(3),
                    'yj':`(${(yj[0]).toFixed(3)};${(yj[1]).toFixed(3)})`,
                    'Fyj': this.F(yj[0],yj[1], funcId).toFixed(3),
                    'yj1': `${(yLyam[0]).toFixed(3)}; ${(yLyam[1]).toFixed(3)}`,
                    'Fyj1': this.F(yLyam[0],yLyam[1], funcId).toFixed(3),
                }
            }
            this.results.push(newData)
        }else {
            this.results.map(elem=>{
                if (elem.k === k){
                    elem.j2 = {
                        'j': 2,
                        'Dj': `(${(Dj[1][0]).toFixed(3)}; ${(Dj[1][1]).toFixed(3)})`,
                        'lyamj': lyam.toFixed(3),
                        'yj':`(${(yj[0]).toFixed(3)};${(yj[1]).toFixed(3)})`,
                        'Fyj': this.F(yj[0],yj[1], funcId).toFixed(3),
                        'yj1': `${(yLyam[0]).toFixed(3)}; ${(yLyam[1]).toFixed(3)}`,
                        'Fyj1': this.F(yLyam[0],yLyam[1], funcId).toFixed(3),
                    }
                }
            })
        }
        
        //Добавление ответа
        if(k<0){
            let newData = {
                'X': `(${X[0].toFixed(3)}; ${X[1].toFixed(3)})`,
                'FX': this.F(X[0],X[1], funcId).toFixed(3),
            }
            this.results.push(newData)
        }
    }

    ClearResults(){
        this.results = [{"error": false, "mas": "" }];
    }
}

module.exports = new Rosenbrock();