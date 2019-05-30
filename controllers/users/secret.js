module.exports = async function(req, res, next) {
  res.status(200).json({ accessing: true });
}
