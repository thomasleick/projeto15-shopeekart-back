const checkRequestRegister = (req, res, next) => {
    if (!Object.keys(req.body.name)) {
        return res.status(400).json({ error: 'Name is required on body' });
    }
    if (!Object.keys(req.body.email)) {
        return res.status(400).json({ error: 'Email is required on body' });
    }
    if (!Object.keys(req.body.pwd)) {
        return res.status(400).json({ error: 'Pwd is required on body' });
    }
    next();
};

module.exports = { checkRequestRegister };