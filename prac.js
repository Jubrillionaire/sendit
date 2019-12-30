import { tokenGenerator } from "./middlewares/middlewares"

export const createUser = () => {
    const {firstname, lastname, email, password} = req.body

    if(err){
        console.log(err)
    }else{
        client.query(`INSERT INTO users (firstname, lastname, email, password) VALUES ($1,$@, $3, $4, $5) RETURNING *` [firstname, lastname, email, password], (err, token) => {
            if(err) {
                res.send('sorry unable to create user')
            }else{
                tokenGenerator(user.rows[0], (err, token) => {
                   if(err) {
                       console.log('unable to generate token')
                   }else{
                       res.send({
                           token: token,
                           msg:  "registered successfully",
                           id:    user.rows[0].id
                       })
                       
                   }
                })
            }
        })
    }
}