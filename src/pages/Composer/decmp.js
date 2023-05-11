
// let gates = [
//     { name: "cz", qubit: [0, 1] },
//     { name: "cz", qubit: [2, 3] },
//     { name: "i", qubit: [4] },
//     { name: "i", qubit: [5] },
//     { name: "cz", qubit: [6, 7] },
//     { name: "cz", qubit: [8, 15] },
//     { name: "cz", qubit: [16, 17] },
//     { name: "cz", qubit: [9, 14] },
//     { name: "cz", qubit: [10, 11] },
//     { name: "cz", qubit: [12, 13] },
// ]

function copy(element){
    return JSON.parse(JSON.stringify(element));
    
}

export  function decompose_gates(gates){
    let result = [];
    let tmp = [];
    let left = 0;
    let right = 0;
    let ql,qr;
    while(gates.length !== 0){
        left=-1;
        right=-1;
        let new_gates=[];
        tmp=[];
        for(let i=0;i<gates.length;i++){
            if(gates[i]['qubit']?.length==1){
                ql=gates[i]['qubit']['0'];
                qr=gates[i]['qubit']['0'];
            }
            else{
                ql=gates[i]['qubit']['0'];
                qr=gates[i]['qubit']['1'];
            }
            
            if(left==-1){
                left = ql;
                right = qr;
                tmp.push(copy(gates[i]));
            }
            else{
                if(qr>=left&&right>=ql){
                    new_gates.push(copy(gates[i]));
                }
                else{
                    tmp.push(copy(gates[i]));
                    left = Math.min(left,ql);
                    right= Math.max(right,qr);
                }
                
            }
            // console.log(left,right);
            
        }
        // console.log(copy(tmp));
        gates=new_gates;
        result.push(copy(tmp));
    }
    return result;
}

// let res = decompose_gates(gates);
// console.log(res[0],res[1],res[2]);