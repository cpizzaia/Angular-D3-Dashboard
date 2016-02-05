var emails = require("./../emails.json");

module.exports = {

  fetchAll: function (req, res) {
    res.send({emails: emails});
  }
};
