const bcrypt = require('bcrypt');

let pswrd = bcrypt.hashSync('12345', 9);

bcrypt.compare('12345', pswrd, (bcryptErr, verified) => {
    if(verified){
        console.log('foi')
        return;
    }
    else{
        console.log('n foi')
    }
})
console.log(pswrd)

