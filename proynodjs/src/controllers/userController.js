//LOGEOO

const { response } = require("express");

function login(req, res) {
    res.render('vistasCrud/login');
}
// Definir la función confirma en este archivo
function confirma(req, res) {
    const { fname, password, rol } = req.body;
    req.getConnection((err, conn) => {
      const sql = "SELECT * FROM users WHERE fname = ? AND password = ? AND rol = ?";
      conn.query(sql, [fname, password, rol], (err, results) => {      
        const user = results[0];
        let userRole = "";
        if (user.rol === 1) {
          userRole = "admin";
        } else if (user.rol === 2) {
          userRole = "usuario";
        }
        console.log(`Usuario ${fname} con rol ${userRole} se ha logeado`);
        res.redirect(`/listar_libro?rol=${userRole}`);
      });
    });
  }
  
//CARRITO


// Genera un id para la orden


// Genera un id para la orden
function generateRandom6DigitInt() {
    // Ensure leading zeros are included
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }
  
  // userController.js
  function carrito(req, res) {
    const data = req.body;
  
    // Generate a random 6-digit order ID
    const orderId = generateRandom6DigitInt();
  
    req.getConnection((err, conn) => {
      const insertQueries = [];
      const updateQueries = [];
  
      data.forEach(item => {
        // Prepare insert query with placeholders for security
        const insertQuery = `INSERT INTO carritocompra (qty, itemId, orderId) VALUES (?, ?, ?)`;
        const insertValues = [item.qty, item.itemId, orderId];
  
        insertQueries.push(new Promise((resolve, reject) => {
          conn.query(insertQuery, insertValues, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        }));
  
        // Prepare update query with placeholders for security
        const updateQuery = `UPDATE libros SET cantidad = cantidad - ? WHERE id = ?`;
        const updateValues = [item.qty, item.itemId];
  
        updateQueries.push(new Promise((resolve, reject) => {
          conn.query(updateQuery, updateValues, (err, result) => {
            alert("¡La compra ha sido exitosa!");
            console.log("se realizo la disminucion con exito");
          });
        }));
      });
  
      Promise.all([...insertQueries, ...updateQueries])
        .then(results => {
          console.log("Insert and update operations completed successfully");
          res.redirect('/listar_libro');
        })
        .catch(error => {
          console.error("Error executing insert and update operations:", error);
        });
    });
  }
  

  

function carritoView(req, res) {
    res.render('vistasCrud/carrito')
}

//CRUD DE USUARIOS
function listar(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users', (err, user) => {
            if (err) {
                res.json(err);
            }
            res.render('vistasCrud/listar', { user });
        })
    });
}

function agregar(req, res) {
    res.render('vistasCrud/agregar');
}

function guardar(req, res) {
    const datos = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO users SET ?', [datos], (err, rows) => {
            res.redirect('/listar');
        })
    });
}

function eliminar(req, res) {
    const id = req.body.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM users WHERE id = ?', [id], (err, rows) => {
            res.redirect('/listar');
        })
    })
}

function editar(req, res) {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
            if (err) {
                res.json(err);
            }
            res.render('vistasCrud/editar', { user });
        })
    });
}

function actualizar(req, res) {
    const id = req.params.id;
    const datos = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE users SET ? WHERE id = ? ', [datos, id], (err, rows) => {
            res.redirect('/listar');
        })
    })
}

//CRUD DE LIBROS**************************************************************************************
function listar_libro(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros', (err, libro) => {
            if (err) {
                res.json(err);
            }
            res.render('vistasCrud/listar_libro', { libro });
        })
    });
}

function listar_libros(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros', (err, libros) => {
            if (err) {
                res.json(err);
            }
            res.json(libros)
        })
    });
}

function agregar_libro(req, res) {
    res.render('vistasCrud/agregar_libro');
}

function guardar_libro(req, res) {
    const datos = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO libros SET ?', [datos], (err, rows) => {
            res.redirect('/listar_libro');
        })
    });
}

function eliminar_libro(req, res) {
    const id = req.body.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM libros WHERE id = ?', [id], (err, rows) => {
            res.redirect('/listar_libro');
        })
    })
}

function editar_libro(req, res) {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros WHERE id = ?', [id], (err, libro) => {
            if (err) {
                res.json(err);
            }
            res.render('vistasCrud/editar_libro', { libro });
        })
    });
}

function actualizar_libro(req, res) {
    const id = req.params.id;
    const datos = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE libros SET ? WHERE id = ?', [datos, id], (err, rows) => {
            res.redirect('/listar_libro');
        })
    })
}



module.exports = {
    //LOGEO
    login : login,
    confirma : confirma,
    //CARRITO
    carrito : carrito,
    carritoView: carritoView,
    //USUARIOS
    listar: listar,
    agregar: agregar,
    guardar: guardar,
    eliminar: eliminar,
    editar: editar,
    actualizar: actualizar,
    //LIBROS
    listar_libro: listar_libro,
    listar_libros: listar_libros,
    agregar_libro: agregar_libro,
    guardar_libro:guardar_libro ,
    eliminar_libro: eliminar_libro,
    editar_libro: editar_libro,
    actualizar_libro: actualizar_libro,
}