module.exports = {
  show: function(req, res) {
    res.render("login");
  },

  store: function(req, res) {
    res.json("login the user");
  },
};
