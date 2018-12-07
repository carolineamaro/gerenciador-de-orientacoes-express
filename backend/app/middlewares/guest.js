module.exports = (req, res, next) => {
  // se tiver sessao deixa passar
  if (!req.session.usuario) {
    return next();
  }

  return res.redirect('/app/principal');
};
