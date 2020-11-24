const calculaCashback = (value) => {
    /* 
    value < 1000 = 10%
    value >= 1000 < 1500 = 15%
    > 1500 20%
    */
    if (parseFloat(value) < 1000) {
        return {
            'value': toBRLCurrency(((parseFloat(value) * 10) / 100)),
            'tax': '10%'
        };
    } else if (parseFloat(value) >= 1000 && parseFloat(value) <= 1500) {
        return {
            'value': toBRLCurrency(((parseFloat(value) * 15) / 100)),
            'tax': '15%'
        };
    } else {
        return {
            'value': toBRLCurrency(((parseFloat(value) * 20) / 100)),
            'tax': '20%'
        };
    }
}

const toBRLCurrency = (amount) => {
    return (parseFloat(amount)).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

const toBRLDate = (date) => {
    return (new Date(date).toLocaleDateString('pt-BR', {
        hour: 'numeric',
        minute: 'numeric'
    }))
}

const maskCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, (regex, argumento1, argumento2, argumento3, argumento4) => {
        return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
    });
}

module.exports = {
    toBRLCurrency,
    toBRLDate,
    maskCPF,
    calculaCashback
}