exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = 'esse é o valor de uma variável local';
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if (err && err.code == 'EBADCSRFTOKEN') {
        return res.send('BAD CSRF.');
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}