F1 = (x)=>{return (10*x - x*x +3)} //(3*x-Math.pow(x,3))}

F2 = (x)=>{return ((2*x*x+3)/(x*x+2*x-8))}


class GoldenSection{
    alpha = 0.618

    MIN=(l, a, b, funcId)=>{
        let results = [{"error": false, "mas": "" }];
        let lam = a+(1-this.alpha)*(b-a);
        let Nu = a+this.alpha*(b-a);
        let Fl = 0;
        let FN = 0;

       
        
        let k=1;

        while(b-a>=l){
            if(funcId=="F1"){
                Fl = F1(lam);
                FN = F1(Nu);
            }else{
                Fl = F2(lam);
                FN = F2(Nu);
            }

            results.push({"k": k, "a":a.toFixed(6), "b":b.toFixed(6), "lam":lam.toFixed(6), "nu": Nu.toFixed(6), "fl":Fl.toFixed(6), "fn": FN.toFixed(6)})

            if(Fl>FN){
                a = lam;
                lam = Nu;
                Nu = a+this.alpha*(b-a)

                if(funcId=="F1")FN = F1(Nu);
                else FN = F2(Nu);
                
            }else{
                b= Nu
                Nu = lam
                lam = a+(1-this.alpha)*(b-a);

                if(funcId=="F1")Fl = F1(lam);
                else Fl = F2(lam);
            }

            k++;

            
            
            if(k>40){
                results[0].error = true;
                results[0].mas = "Ошибка! Бесконечный цикл"
                return results;
            }
        }

        let opt = (a+b)/2
        let Fopt=0;

        if(funcId=="F1"){
            Fopt = F1(opt);
            
        }else{
            Fopt = F2(opt);
        }

        results.push({"a":a.toFixed(6), "b":b.toFixed(6), "opt": opt.toFixed(6), "F": Fopt.toFixed(6) })
        //console.log(results)
        return results
    }

    MAX=(l, a, b, funcId)=>{
        let results = [{"error": false, "mas": "" }];
        let lam = a+(1-this.alpha)*(b-a);
        let Nu = a+this.alpha*(b-a);
        let Fl = 0;
        let FN = 0;
        
        let k=1;

        while(b-a>=l){
            if(funcId=="F1"){
                Fl = F1(lam);
                FN = F1(Nu);
            }else{
                Fl = F2(lam);
                FN = F2(Nu);
            }

            results.push({"k": k, "a":a.toFixed(6), "b":b.toFixed(6), "lam":lam.toFixed(6), "nu": Nu.toFixed(6), "fl":Fl.toFixed(6), "fn": FN.toFixed(6)})

            if(Fl<FN){
                a = lam;
                lam = Nu;
                Nu = a+this.alpha*(b-a)

                if(funcId=="F1")FN = F1(Nu);
                else FN = F2(Nu);
                
            }else{
                b= Nu
                Nu = lam
                lam = a+(1-this.alpha)*(b-a);

                if(funcId=="F1")Fl = F1(lam);
                else Fl = F2(lam);
            }

            k++;

            
            
            if(k>40){
                results[0].error = true;
                results[0].mas = "Ошибка! Бесконечный цикл"
                return results;
            }
        }

        let opt = (a+b)/2
        let Fopt=0;

        if(funcId=="F1"){
            Fopt = F1(opt);
            
        }else{
            Fopt = F2(opt);
        }

        results.push({"a":a.toFixed(6), "b":b.toFixed(6), "opt": opt.toFixed(6), "F": Fopt.toFixed(6) })
        console.log(results)
        return results
    }
}
module.exports = new GoldenSection();
//console.lof(GoldenSection_MAX(0.01, 0.1, 1, 6, "F1"))