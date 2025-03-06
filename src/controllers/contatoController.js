const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    if (req.session.user) return res.render('contato', { contato: {} });
    return res.render('login');
};

exports.register = async (req, res) => {
    const contato = new Contato(req.body, req.session.user.email);
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
            return res.redirect(`/contato/index/${contato.contato._id}`);
        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async (req, res) => {
    try {
        if (req.session.user) {
            if (!req.params.id) return res.render('404');
            const contato = await Contato.buscaPorId(req.params.id);
            if (!contato) return res.render('404');
            res.render('contato', { contato });
            idUsuario = contato._id;
            req.session.contato = {
                _id: idUsuario || '',
                nome: contato.nome,
                sobrenome: contato.sobrenome,
                telefone: contato.telefone,
                email: contato.email,
                idUsuario: contato.idUsuario
            }

            return res.render('contato', { contato });

        } else return res.render('login');
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.edit = async (req, res) => {
    try {
        if (req.session.user) {
            if (!req.params.id) return res.render('404');
            const contato = new Contato(req.body, req.session.user.email);
            await contato.edit(req.params.id);
            idUsuario = req.params._id;

            if (contato.errors.length > 0) {
                req.flash('errors', contato.errors);
                req.session.contato = {
                    _id: idUsuario,
                    nome: contato.nome,
                    sobrenome: contato.sobrenome,
                    telefone: contato.telefone,
                    email: contato.email,
                    idUsuario: contato.idUsuario
                    }
                req.session.save(() => {
                    res.location(req.get("Referrer") || "/");
                    return res.redirect('./contato/edit');
                });
                req.session.contato._id = idUsuario;
                return;
            }

            req.flash('success', 'Contato editado com sucesso.');
            idUsuario = contato.contato._id;
            req.session.save(() => {
                res.location(req.get("Referrer") || "/");
                return res.redirect(`/contato/index/${contato.contato._id}`);
            });
            return;
        } else return res.render('login');
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.delete = async (req, res) => {
    try {
        if (req.session.user) {
        if (!req.params.id) return res.render('404');
        const contato = await Contato.delete(req.params.id);
        if (!contato) return res.render('404');

        req.flash('success', 'Contato apagado com sucesso.');
        req.session.save(() => {
            res.location(req.get("Referrer") || "/");
            return res.redirect(`/`);
        });
        return;
        } else return res.render('login'); 
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}