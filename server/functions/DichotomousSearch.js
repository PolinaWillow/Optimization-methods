class DichotomousSearch{
    F1(x){return (10*x - x*x +3)}
    F2(x){return ((2*x*x+3)/(x*x+2*x-8))}

    MAX(e, l, a, b, funcId){
        console.log(`a: ${a};\t b: ${b};\t e: ${e};\t l: ${l};\t funcId: ${funcId};`)
        let results = [{"error": false, "mas": "" }];
        let lam = 0;
        let Nu = 0;
        let Fl = 0;
        let FN = 0;
        let k=0;
        while (b-a>=l){
            k++
            lam = (a+b)/2-e //7,45
            Nu = (a+b)/2+e //7,65

            if(funcId=="F1"){
                Fl = this.F1(lam);
                FN = this.F1(Nu);
                console.log(10*lam-lam*lam+3)
            }else{
                Fl = this.F2(lam);
                FN = this.F2(Nu);
            }

            results.push({"k": k, "a":a.toFixed(6), "b":b.toFixed(6), "lam":lam.toFixed(6), "nu": Nu.toFixed(6), "fl":Fl.toFixed(6), "fn": FN.toFixed(6)})

            if(Fl>FN) {
                b = Nu
                console.log(b)
            }
            else a = lam

            console.log(`a: ${a};\t b: ${b};\t lam: ${lam};\t Nu: ${Nu};\t Fl: ${Fl};\t FN: ${FN};`)
            //results.push({"k": 1, "a":a, "b":b, "lam":lam, "nu": Nu, "fl":Fl, "fn": FN})

            if(k>40){
                results[0].error = true;
                results[0].mas = "Ошибка! Бесконечный цикл"
                return results;
            }

        }
        
        let opt = (a+b)/2
        let Fopt=0;

        if(funcId=="F1"){
            Fopt = this.F1(opt);
            
        }else{
            Fopt = this.F2(opt);
        }

        results.push({"a":a.toFixed(6), "b":b.toFixed(6), "opt": opt.toFixed(6), "F": Fopt.toFixed(6) })
        return results
    }

    MIN(e, l, a, b, funcId){
        let results = [{"error": false, "mas": "" }];
        let lam = 0;
        let Nu = 0;
        let Fl = 0;
        let FN = 0;
        let k=0;
        while (b-a>=l){
            k++
            lam = (a+b)/2-e //7,45
            Nu = (a+b)/2+e //7,65

            if(funcId=="F1"){
                Fl = this.F1(lam);
                FN = this.F1(Nu);
            }else{
                Fl = this.F2(lam);
                FN = this.F2(Nu);
            }

            results.push({"k": k, "a":a.toFixed(6), "b":b.toFixed(6), "lam":lam.toFixed(6), "nu": Nu.toFixed(6), "fl":Fl.toFixed(6), "fn": FN.toFixed(6)})

            if(Fl<FN) b = Nu
            else a = lam

            if(k>40){
                results[0].error = true;
                results[0].mas = "Ошибка! Бесконечный цикл"
                return results;
            }

            //console.log(`a: ${a};\t b: ${b};\t lam: ${lam};\t Nu: ${Nu};\t Fl: ${Fl};\t FN: ${FN};`)

        } 
        
        let opt = (a+b)/2
        let Fopt=0;

        if(funcId=="F1"){
            Fopt = this.F1(opt);
            
        }else{
            Fopt = this.F2(opt);
        }

        results.push({"a":a.toFixed(6), "b":b.toFixed(6), "opt": opt.toFixed(6), "F": Fopt.toFixed(6) })
        return results
    }
}

module.exports = new DichotomousSearch();
//console.log(DichotomousSearch_MAX(0.01, 0.1, 1, 6, "F2"))