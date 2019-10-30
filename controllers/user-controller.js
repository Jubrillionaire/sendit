import express from "express";
import bodyParser from "body-parser";
import { validationResult } from "express-validator/check";
import { tokenGenerator } from "../middlewares/middlewares";

//CREATE USER
export const createUser = (req, res) => {
    const{first_name, last_name, email, phone_no, password} = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
        client.query(`INSERT INTO users (first_name, last_name, email, phone_no, password) VALUES($1, $2, $3, $4, $5) RETURNING *`, [first_name, last_name, email, phone_no, password], (err, user) =>{
            if(err){
                res.send({msg: err.detail});
            }else{
                tokenGenerator(user.rows[0], (err, token) =>{
                    if(err){
                        res.send("unable to encode token")
                    }else{
                        res.status(201).send({
                            success: true,
                            msg: "Registered successfully!",
                            userId: user.rows[0].id,
                            token,
                            expiresIn: "24hours"
                          });
                    }
                })
            }
        })
    }
}


//USER LOGIN 
export const userLogin = (req, res) => {
    const { email, password } = req.body;
    client.query(
      `SELECT * FROM users WHERE email = $1 AND password = $2`,
      [email, password],
      (err, user) => {
        if (err) {
          res.send(err);
        } else if (user.rows.length) {
          tokenGenerator(user.rows[0], (err, token) => {
            if (err) {
              res.send({ msg: "Unable to encode token" });
            } else {
              res.send({
                msg: "Login successful",
                userId: user.rows[0].id,
                token,
                expiresIn: "24hours"
              });
            }
          });
        } else {
          res.send({
            success: false,
            msg: "Incorrect email or password"
          });
        }
      }
    );
  };

  //GET USER
  export const getUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      client.query(
        `SELECT * FROM users WHERE id = ${req.decoded.id}`,
        (err, resp) => {
          if (err) {
            res.status(500).send(err);
          } else {
            console.log(resp.rows[0]);
            res.status(200).send(resp.rows[0]);
          }
        }
      );
    }
  };