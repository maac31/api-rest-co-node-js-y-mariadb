const express = require("express")
const routes = express.Router()

// rutas
// esta ruta me permite visualizar los libros en la db
routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(err)
        conn.query('SELECT * FROM books', (err, rows) => {
            if (err) {
                return res.status(err);

            }
            res.json(rows);
        });
    });
});

//con esta agregamos los libros en la db
routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(err)
        conn.query('INSERT INTO books set ?', [req.body], (err, rows) => {
            if (err) return res.send(err);
                res.send("book insertado")
        });
    });
});

// con esta eliminamos los libros en la db
routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(err)
        conn.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)
                res.send("book eliminado")
        });
    });
});

// con esta actualizamos los libros en la db

routes.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE books set ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
            if (err) return res.send(err)
            res.send("book actualizao")
        });
    });
});

module.exports = routes