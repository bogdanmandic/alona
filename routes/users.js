var express = require('express');
var router = express.Router();
const dbc = require('../config/dbc');
const ejs = require('ejs');
const fs = require('fs');
const pdf = require('html-pdf');


/* GET users listing. */
router.get('/', function(req, res, next) {
  dbc.query("SELECT * from user", (err, results) => {
    if (err) throw err;
    res.send(results);
  })
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  let params = [];
  params.push(id);
  q = "SELECT * FROM user where id=?";
  dbc.query(q, params, (err, user) => {
    if (err) throw err;
    res.render('users/show', {
      user: user[0]
    });
  });
});

router.post('/:id/pdf', (req, res) => {
  let id = req.params.id;
  let params = [];
  params.push(id);
  q = "SELECT * FROM user where id=?";
  dbc.query(q, params, (err, user) => {
    if (err) throw err;
    ejs.renderFile('views/users/show2.ejs', {user: user[0]}, function (err, html) {
      if (err) console.log(err);
      var options = { format: 'A5', orientation: 'portrait' };
      pdf.create(html, options).toFile('./pdf/user_'+user[0].id+ '.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
      });
      res.send(html);
    });
    
  });
  // console.log(template);
})


module.exports = router;
