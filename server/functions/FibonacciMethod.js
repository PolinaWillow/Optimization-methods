class FibonacciMethod{
    F1(x){return (10*x - x*x +3)}
    F2(x){return ((2*x*x+3)/(x*x+2*x-8))}

    Fibonacci(i){
        if(i<=0) return 0
        if(i==1) return 1

        return this.Fibonacci(i-1)+this.Fibonacci(i-2)
    }
    
    MIN=(e, l, a, b, funcId)=>{
        let results = [{"error": false, "mas": "" }];

        let n = 1;
        while(this.Fibonacci(n)<=Math.abs(b-a/l)) n++;

        console.log(n)
        let fib=""
        for(let i=1;i<=n;i++){
            fib+=this.Fibonacci(i).toString()+" "
        }
        console.log(fib)

        let lam = a+(this.Fibonacci(n-2)/this.Fibonacci(n))*Math.abs(b-a);

        let Nu = a+(this.Fibonacci(n-1)/this.Fibonacci(n))*Math.abs(b-a);
        let Fl = 0;
        let FN = 0;

        if(funcId=="F1"){
            Fl = this.F1(lam);
            FN = this.F1(Nu);
        }else{
            Fl = this.F2(lam);
            FN = this.F2(Nu);
        }

        results.push({"k": 1, "a":a.toFixed(6), "b":b.toFixed(6), "lam":lam.toFixed(6), "nu": Nu.toFixed(6), "fl":Fl.toFixed(6), "fn": FN.toFixed(6)})

        let k = 1;
        let aPrev = a;
        let bPrev = b;
        let lamPrev = lam;

        

        while(k<=(n-2)){
            if(Fl>FN){
                aPrev = a
                a = lam;
                lamPrev = lam
                lam = Nu

                Nu = a+(this.Fibonacci(n-k)/this.Fibonacci(n-k+1))*Math.abs(b-a)
                
                if(k!=(n-2)){
                    if(funcId=="F1"){
                        FN = this.F1(Nu);
                        
                    }else{
                        FN = this.F2(Nu);
                    }
                }
            }else{
                bPrev = b
                b = Nu
                Nu = lam
                lamPrev = lam
                lam = a+(this.Fibonacci(n-k-1)/this.Fibonacci(n-k+1))*Math.abs(b-a)

                if(k!=(n-2)){
                    if(funcId=="F1"){
                        Fl = this.F1(lam);
                        
                    }else{
                        Fl = this.F2(lam);
                    }
                }
            }

            if(k==(n-2)){
                lam = lamPrev
                Nu = lam+e

                if(Fl>FN){
                    a = lam
                    b = bPrev
                }else{
                    a = aPrev
                    b = Nu
                }
                
            }

            k++
            results.push({"k": k, "a":a.toFixed(6), "b":b.toFixed(6), "lam":lam.toFixed(6), "nu": Nu.toFixed(6), "fl":Fl.toFixed(6), "fn": FN.toFixed(6)})
        }

        let opt = (a+b)/2
        let Fopt=0;

        if(funcId=="F1"){
            Fopt = F1(opt);
            
        }else{
            Fopt = F2(opt);
        }

        results.push({"a":a.toFixed(6), "b":b.toFixed(6), "opt": opt.toFixed(6), "F": Fopt.toFixed(6) })
        return results
    }
    
    MAX=(e, l, a, b, funcId)=>{
        let results = [{"error": false, "mas": "" }];

        let n = 1;
        while(this.Fibonacci(n)<=Math.abs(b-a/l)) n++;

        let lam = a+(this.Fibonacci(n-2)/this.Fibonacci(n))*Math.abs(b-a);

        let Nu = a+(this.Fibonacci(n-1)/this.Fibonacci(n))*Math.abs(b-a);
        let Fl = 0;
        let FN = 0;

        if(funcId=="F1"){
            Fl = this.F1(lam);
            FN = this.F1(Nu);
        }else{
            Fl = this.F2(lam);
            FN = this.F2(Nu);
        }

        results.push({"k": 1, "a":a.toFixed(6), "b":b.toFixed(6), "lam":lam.toFixed(6), "nu": Nu.toFixed(6), "fl":Fl.toFixed(6), "fn": FN.toFixed(6)})

        let k = 1;
        let aPrev = a;
        let bPrev = b;
        let lamPrev = lam;

        

        while(k<=(n-2)){
            if(Fl<FN){
                aPrev = a
                a = lam;
                lamPrev = lam
                lam = Nu

                Nu = a+(this.Fibonacci(n-k)/this.Fibonacci(n-k+1))*Math.abs(b-a)
                
                if(k!=(n-2)){
                    if(funcId=="F1"){
                        FN = this.F1(Nu);
                        
                    }else{
                        FN = this.F2(Nu);
                    }
                }
            }else{
                bPrev = b
                b = Nu
                Nu = lam
                lamPrev = lam
                lam = a+(this.Fibonacci(n-k-1)/this.Fibonacci(n-k+1))*Math.abs(b-a)

                if(k!=(n-2)){
                    if(funcId=="F1"){
                        Fl = this.F1(lam);
                        
                    }else{
                        Fl = this.F2(lam);
                    }
                }
            }

            if(k==(n-2)){
                lam = lamPrev
                Nu = lam+e

                if(Fl<FN){
                    a = lam
                    b = bPrev
                }else{
                    a = aPrev
                    b = Nu
                }
                
            }

            k++
            results.push({"k": k, "a":a.toFixed(6), "b":b.toFixed(6), "lam":lam.toFixed(6), "nu": Nu.toFixed(6), "fl":Fl.toFixed(6), "fn": FN.toFixed(6)})
        }

        let opt = (a+b)/2
        let Fopt=0;

        if(funcId=="F1"){
            Fopt = F1(opt);
            
        }else{
            Fopt = F2(opt);
        }

        results.push({"a":a.toFixed(6), "b":b.toFixed(6), "opt": opt.toFixed(6), "F": Fopt.toFixed(6) })
        return results
    }
}

module.exports = new FibonacciMethod();