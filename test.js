function p(){
    let a = 12;
    return new Promise((resolve, reject)=>{
        if (a==12) resolve('good');
        else reject('bad')
    })
}

let z;

