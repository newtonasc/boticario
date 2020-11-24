const express = require('express');
const router = express.Router();
const helper = require("../helpers");
const db = require("../db");
const request = require('request');
const {
    verifyJWT
} = require('../middleware');

router.post('/add', verifyJWT, async (req, res) => {
    try {
        if (!req.body.cpf ||
            !req.body.code ||
            !req.body.value) {
            res.status(401).json({
                message: 'Informar os dados da compra!'
            });
        }

        let purshase = {
            cpf: req.body.cpf.replace(/\D/g, ''),
            code: req.body.code,
            value: req.body.value.replace('.', '').replace(',', '.'),
            status: (req.body.cpf.replace(/\D/g, '') == '15350946056') ? 2 : 1
        }
        res.status(201).json(await db.insertPurshase(purshase));
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

router.get('/', verifyJWT, async (req, res) => {
    try {
        let result = await db.getPurshases();

        //let totalValue = 0;

        result.forEach((p, i) => {
            let parseValue = helper.calculaCashback(p.pur_value);
            result[i]['pur_cpf'] = helper.maskCPF(p.pur_cpf);
            result[i]['pur_cashback'] = parseValue.value;
            result[i]['pur_tax'] = parseValue.tax;
            result[i]['pur_value'] = helper.toBRLCurrency(p.pur_value);
            result[i]['pur_date'] = helper.toBRLDate(p.pur_date)
            //totalValue += p.pur_value;
        });

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

router.get('/cashback/:cpf', verifyJWT, function (req, res, next) {
    request({
        uri: 'https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=' + req.params.cpf.replace(/\D/g, ''),
        qs: {
            token: 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm'
        }
    }).pipe(res);
});

module.exports = router