exports.paginaInicial = (req, res) => {
    res.render('index', {
        titulo: 'Esse é o título da pagina',
        numeros: [1,2,3,4,5,6,7,8,9]
    });
};