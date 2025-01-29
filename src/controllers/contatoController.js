const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato', {
        contato: {} 
    });
};

exports.register = async (req, res) => {
    const contato = new Contato(req.body);
    await contato.register();
    try {
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => {
                res.location(req.get("Referrer") || "/");
                return res.redirect('./index');
            });
            return;
        }

        req.flash('success', 'Contato registrado com sucesso.');
        req.session.save(() => {
            res.location(req.get("Referrer") || "/");
            return res.redirect(`./index/${contato.contato._id}`);
        });
        
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');
    const contato = await Contato.buscaPorId(req.params.id);
    if (!contato) return res.render('404');
    res.render('contato', { contato });
};