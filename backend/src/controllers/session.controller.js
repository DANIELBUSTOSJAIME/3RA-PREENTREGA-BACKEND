import { generateToken } from "../utils/jwt.js";

export const postLogin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({mensaje: "Invalidate User"});
    }
      req.session.user = {
      name: req.user.name,
      lastName: req.user.lastName,
      email: req.user.email,
      age: req.user.age,
      
    };
    
    const token = generateToken(req.user);
    res.cookie('jwtCookie', token, {
      maxAge: 43200000
    })
    res.status(200).send({ token })
    console.log(token)
      }catch(error){
        res.status(500).send({mensaje: `error al iniciar sesion ${error} `})
      }
}

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