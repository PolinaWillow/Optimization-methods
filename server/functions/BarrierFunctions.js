const { results } = require("./Rosenbrock")

class BarrierFunctions {
    results = [{"error": false, "mas": "" }];

    //Основная функция
    F(x1, x2){ return (Math.pow((x1-5),2)+Math.pow((x2-3),2)) }

    //Ограничение функции 1 x1*(-1)+2*x2-4 <= 0
    Limit1(x1, x2){ return (x1*(-1)+2*x2-4) }
    
    //Ограничение функции 2 x1+x2-3 <= 0
    Limit2(x1, x2){ return (x1+x2-3) }
    
    //Барьерная функция
    B(x1, x2){ return((-1)/this.Limit1(x1, x2) + (-1)/this.Limit2(x1, x2)) }
    
    //Вспомогательная функция
    HelperF(x1, x2, mu){ return (this.F(x1, x2)+mu*this.B(x1, x2))}



    /***********Метод Розенброка***********************/
    FindFunction(y1, y2, dj, j, x, mu){
        let s=0;
        let result

        let x1 = y1 + x * dj[j - 1][s]
        let x2 = y2 + x * dj[j - 1][s + 1]
        result = this.HelperF(x1, x2, mu)
            
        return result
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

    GoldenSection(y1, y2, Dj, j, mu_start){
        let l = 0.01
        let alpha = 0.618
        let a = -10//-1;
        let b = 11//2;
        let k = 1;
        let lyam = a + (1 - alpha) * (b - a);
        let mu = a + alpha * (b - a);


        let fl = this.FindFunction(y1, y2, Dj, j, lyam, mu_start)
        let fm = this.FindFunction(y2, y2, Dj, j, mu, mu_start)

        k++;
        while((b-a)>=l){
            if (fl > fm){
                a = lyam;
                lyam = mu;
                fl = fm;
                mu = a + alpha * (b - a);
                fm = this.FindFunction(y1, y2, Dj, j, mu, mu_start)
                
            }else{
                b = mu;
                mu = lyam;
                fm = fl;
                lyam = a + (1 - alpha) * (b - a);

                fl = this.FindFunction(y1, y2, Dj, j, lyam, mu_start)
            }
        }
        let rez = (b+a)/2
        // console.log(`j = ${j}; res = ${rez}`)
        return rez
    
    }

    //Минимизация функции методом розенброка
    MIN(eps, x01, x02, mu){
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
            //Запоминаем текущее значение X
            xPrev = Array.from(X);
            y = Array.from(X)
            k++

            //Построение нового множества линейно независимых и взаимно ортогональных направлений в соответствии с процедурой Грамма-Шмидтта
            if(k>1){
                console.log(lyamPrev1, lyamPrev2)
                Dj = this.GramSchmidt(k, lyamPrev1, lyamPrev2, Dj)
            }
            j=1;
            while(j<=n){
                //Поиск оптимального решения задачи минимизации
                lyam = this.GoldenSection(y[0], y[1], Dj, j, mu);
                // console.log('lyam = '+lyam)
                let s = 0;

                //Посик y для lyam
                let yLyam = [0, 0]
                yLyam[0] = y[0] + lyam * Dj[j-1][s];
                yLyam[1] = y[1] + lyam * Dj[j-1][s+1];

                // console.log(Dj)

                if(j==1) lyamPrev1 = lyam;
                else if(j==2) lyamPrev2 = lyam;

                //Определяем y[j+1]
                y[0] = yLyam[0];
                y[1] = yLyam[1];

                //Добавление промежуточных результатов
                j++;
            }
            //Получение X итерации k+1
            // console.log(y)
            X = Array.from(y)

            //Проверка, лежит ли X В допустимой области
            if(this.Limit1(X[0], X[1])>0 || this.Limit2(X[0], X[1])>0) {
                return xPrev
            }
        }

        return X
    }
    
    Optimum(start_mu, eps, x01, x02){
        this.ClearResults()
       
        let X = [x01, x02];
        let betta = 0.1;
        let mu = start_mu;
        /***************************************************************/

        //Проверка входных данных
        if(this.Limit1(X[0], X[1])>=0 || this.Limit2(X[0], X[1])>=0) {
            this.AddResult('error', 'Начальная точка вне ограничений')
            return this.results
        }
        if(eps<=0){
            this.AddResult('error', 'Точность решения <= 0')
            return this.results
        }
        if(mu<=0){
            this.AddResult('error', 'параметр mu <= 0')
            return this.results
        }

        //Основной этап
        let k = 1;
        X = Array.from(this.MIN(eps, X[0], X[1], mu)) //Минимизируем методом Розенброка

        this.AddResult('intermediate','', k, mu, X)

        // console.log("\nk = "+k)
        // console.log(mu)
        // console.log(X)
        // console.log(this.F(X[0],X[1]))
        // console.log(this.B(X[0], X[1]))
        // console.log(this.HelperF(X[0], X[1], mu))
        // console.log(mu*this.B(X[0], X[1]))

        while(mu*this.B(X[0], X[1])>eps){
            k++;
            mu = mu*betta;
            X = Array.from(this.MIN(eps, X[0], X[1], mu))

            this.AddResult('intermediate','', k, mu, X)
            
            // console.log("\nk = "+k)
            // console.log(mu)
            // console.log(X)
            // console.log(this.F(X[0],X[1]))
            // console.log(this.B(X[0], X[1]))
            // console.log(this.HelperF(X[0], X[1], mu))
            // console.log(mu*this.B(X[0], X[1]))
        }

        this.AddResult('finish','',0, 0, X)

        return this.results
    }

    AddResult(typeResult, mas='', k=0, mu=0, X=[]){
        if(typeResult=='intermediate'){
            let newData = {
                'k': k,
                'mu': mu.toFixed(5),
                'Xk': `(${(X[0]).toFixed(5)}; ${(X[1]).toFixed(5)})`,
                'FXk': this.F(X[0],X[1]).toFixed(5),
                'BXk': this.B(X[0], X[1]).toFixed(5),
                'QXk': this.HelperF(X[0], X[1], mu).toFixed(5),
                'muBXk': (mu*this.B(X[0], X[1])).toFixed(5),
                
            }
            this.results.push(newData)
        }
        if(typeResult=='finish'){
            let newData = {
                'X': `(${X[0].toFixed(3)}; ${X[1].toFixed(3)})`,
                'FX': this.F(X[0],X[1]).toFixed(3),
            }
            this.results.push(newData)

        }
        if(typeResult=='error'){
            this.ClearResults
            this.results[0].error = true
            this.results[0].mas = mas
        }
    }

    ClearResults(){
        this.results = [{"error": false, "mas": "" }];
    }
}

module.exports = new BarrierFunctions();