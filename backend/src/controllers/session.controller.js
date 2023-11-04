import { generateToken } from "../utils/jwt.js";

export const postLogin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send(`
      <script>
        alert("Usuario o contraseña invalidos");
        window.location.href = "/login";
      </script>
    `);
    }
    /* COMO USO JWT NO APLICO SESSION EN BDD
      req.session.user = {
      name: req.user.name,
      lastName: req.user.lastName,
      email: req.user.email,
      age: req.user.age,
      res.status(200).send({mensaje: "Usuario logueado"})
    };*/
    const user = req.session.user;
    const token = generateToken(req.user);
    /*res.cookie('jwtCookie', token, { // SE PUEDE ELIMINAR ESTO UNA VEZ QUE SE IMPLEMENTE EL FRONT END
      maxAge: 43200000
    });*/
    res.status(200).send({token}
      /*`
      <script>
      alert("Bienvenido ${user.name} ${user.lastName}"); 
      window.location.href = "/products";
      </script>
      `*/
      )
  } catch (error) {
    res.status(500).send({ mensaje: `Error al iniciar sesión ${error}` });
  }
};

export const postSignUp = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send({ mensaje: "Usuario ya existente" });
    }
    res.status(200).send({ mensaje: "Usuario registrado" });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al registrar usuario ${error}` });
  }
};

export const getCurrentUser = (req, res) => {
  res.send(req.user);
};

export const getGithubAuth = async (req, res) => {
  res.status(200).send({ mensaje: "Usuario registrado" });
  res.redirect('/login');
};

export const getGithubCallback = async (req, res) => {
  res.session.user = req.user;
  res.status(200).send({ mensaje: "Usuario logueado" });
};

export const getGithubLoginCallback = (req, res) => {
  res.redirect('/products');
};

export const getLogout = async(req, res) => {
  /* COMO USO JWT ESTO NO IRIA
  if (req.session.login) {
    req.session.destroy();
  }*/
  res.clearCookie('jwtCookie');
  res.redirect('/login', 200, { resultado: 'Usuario deslogeado' });
};