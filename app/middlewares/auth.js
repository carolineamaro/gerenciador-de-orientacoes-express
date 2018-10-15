module.exports = (req, res, next) => {
  // se tiver sessao deixa passar
  if (req.session && req.session.usuario) {
    return next();
  }

  req.flash('error', 'Não autorizado');
  return res.redirect('/');
};
