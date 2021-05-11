const bcrypt = require('bcrypt');

class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
        this.cadastro(app, db);
    }

    login(app, db) {

        app.post('/login', (req, res) => {
            let email =  req.body.email;
            let password = req.body.password;

            email = email.toLowerCase();

            if(email.length > 120 || password.length > 120){
                res.json({
                    success: false,
                    msg: 'An error occure, please try again'
                })
                return;
            }

            let cols = [email];
            db.query('SELECT * FROM  user WHERE email = ? LIMIT 1', cols, (err, data, fields) => {

                if(err) {
                    res.json({
                        success: false,
                        msg: 'An error occure, please try again'
                    })
                    return;
                }

                //found 1 user with this email
                if(data && data.length === 1){
 
                    bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {
                        
                        if(verified) {

                            req.session.userID = data[0].id;

                            res.json({
                                success: true,
                                email: data[0].email
                            })

                            return;
                        }
                        else{

                            res.json({
                                success: false,
                                msg: 'Invalid password'
                            })
                        }
                    })
                }
                else{
                    res.json({
                        success: false,
                        msg: 'User not find, please try again'
                    })
                }
            });
        });
    }

    logout(app, db) {

        app.post('/logout', (req, res) => {

            if(req.session.userID){
                req.session.destroy();
                res.json({
                    success: true
                })
                return true;
            }
            else{
                res.json({
                    success: false
                })
                return false;
            }
        });
    }

    isLoggedIn(app, db) {

        app.post('/isLoggedIn', (req, res) => {

            if(req.session.userID) {
                
                let cols = [req.session.userID];
                db.query('SELECT * FROM user WHERE id = ? LIMIT 1', cols, (err, data, fields) => {

                    if(data && data.length === 1) {

                        res.json({
                            success: true,
                            email: data[0].email
                        })
                        return true;
                    }
                    else{
                        res.json({
                            success: false
                        })
                    }
                })
            }
            else{
                res.json({
                    success: false
                })
            }
        });
    }

    cadastro(app, db) {
        app.post('/cadastro', (req, res) => {
            let username = req.body.username;
            let email =  req.body.email;
            let password = req.body.password;

            email = email.toLowerCase();

            let cols = [email];
            db.query('SELECT * FROM  user WHERE email = ?', cols, (err, data, fields) => {
                if(err) {
                    res.json({
                        success: false,
                        msg: 'An error occure, please try again'
                    })
                    return;
                }
                if(data.length > 0){
                    res.json({
                        success: false,
                        msg: 'email já cadastrado'
                    })
                    return;
                }

                //found 1 user with this email
                if(data.length === 0){
                    let pswrd = bcrypt.hashSync(password, 9);
                    let values = [email]

                    db.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, pswrd], (err, data, fields) => {
                        if(err){
                            res.json({
                                success: false,
                                msg: 'An error occure, please try again'
                            })
                            return
                        }
                    });
                    res.json({
                        success: true,
                        msg: 'Usuário cadastrado com sucesso!!!\nFaça Login para continuar'
                    })
                    return                    
                }
                else{
                    res.json({
                        success: false,
                        msg: 'User not find, please try again'
                    })
                }
            });
        });
    }
}

module.exports = Router;