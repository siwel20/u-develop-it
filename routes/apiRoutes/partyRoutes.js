const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// get all parties
// orginally app.get('/api/parties'
router.get('/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    const params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: rows
      });
    }); 
});

// get single party
// orginally app.get('/api/party/:id'
router.get('/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: row
      });
    });
});

// delete parties
// orginally app.delete('/api/party/:id'
router.delete('/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params, function(err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
        // when using "this" the function has to be ES5, which means the function in db.run 5 lines above cannot be an arrow function. 
      res.json({ message: 'successfully deleted', changes: this.changes });
    });
});

module.exports = router;