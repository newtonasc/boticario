const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require("../db");

router.get('/', (req, res, next) => {
    res.json({
        message: "Bem vindo a API Boticário"
    });
});

router.post('/add', async (req, res) => {
    try {
        if (!req.body.name ||
            !req.body.email ||
            !req.body.cpf ||
            !req.body.passwd) {
            res.status(401).json({
                message: 'Informar os dados do revendedor!'
            });
        }

        let reseller = {
            name: req.body.name,
            email: req.body.email,
            cpf: req.body.cpf.replace(/\D/g, ''),
            passwd: req.body.passwd,
            address: (req.body.address) ? req.body.address : null,
            cep: (req.body.cep) ? req.body.cep.replace(/\D/g, '') : null,
            uf: (req.body.uf) ? req.body.uf : null,
            phone: (req.body.phone) ? req.body.phone.replace(/\D/g, '') : null,
            birth: (req.body.birth) ? req.body.birth.split('/').reverse().join('-') : null
        }

        res.status(201).json(await db.insertReseller(reseller));
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

router.post('/login', async (req, res, next) => {
    try {
        if (!req.body.cpf || !req.body.passwd) {
            res.status(400).json({
                message: 'Informar os dados de login!'
            });
        }

        let result = await db.login(req.body);

        if (!result[0]) {
            res.status(400).json({
                message: 'Login inválido!'
            });
        }

        const id = result[0].id;
        const token = jwt.sign({
            id
        }, process.env.SECRET, {
            expiresIn: 300
        });
        return res.json({
            auth: true,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

module.exports = router