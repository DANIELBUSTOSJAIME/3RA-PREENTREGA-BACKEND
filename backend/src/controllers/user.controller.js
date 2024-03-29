import { userModel } from "../models/user.models.js";
import crypto from 'crypto'
import {createHash} from "../utils/bcrypt.js"
import { sendRecoveryMail } from "../config/nodemailer.js";


export const getUsers = async (req, res) => {
    try{
        const users = await userModel.find().limit()
        res.status(200).send({respuesta: 'OK', mensaje: users})
    } catch (error) {
        res.status(400).send({respuesta: "Error en consultar usuario", mensaje: error})
    }
}

export const getUserById = async (req, res) => {
    const {id} = req.params
    try{
        const user = await userModel.findById(id)
        if(user)
            res.status(200).send({respuesta: 'OK', mensaje: user})
        else
            res.status(404).send({respuesta: 'Error en consultar usuario', mensaje:"User Not Found",})
    } catch (error) {
        res.status(400).send({respuesta: "Error en consultar usuario", mensaje: error})
    }
}

export const updateProfilePicture = async (req,res) => {
  try{
      if(!req.file){
          return res.status(400).send({ message: 'Error al cargar la imagen'})
      }

      return res.status(200).send({ message: 'Imagen cargada exitosamente'})

  }catch{

      return res.status(500).json({ message: 'Hubo un error al subir la imagen de perfil' });
  }
}

export const updateDocuments = async (req,res) => {
  try{
      if(!req.file){
          return res.status(400).send({ message: 'Error al cargar archivo' });
      }
      return res.status(200).send({ message: 'Archivo cargado exitosamente' });
  } catch{
      return res.status(500).json({ message: 'Hubo un error al cargar los archivos' })
  }
}

export const updateProductsImage = async (req, res) => {
  try{
      if(!req.file){
          return res.status(400).send({ message: 'Error al cargar la imagen del producto' })
      }
      return res.status(200).send({ message: 'Imagen del producto cargada exitosamente' })

  }catch{
      return res.status(500).send({ message: 'Error al intentar subir imagen del producto' })
  }
}
  /*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer ({ storage: storage})
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("Imagen cargada")
})*/


export const putUserById = async (req, res) => {
    const {id} = req.params
    const {name, lastName, age, email, password } = req.body
    try{
        const user = await userModel.findByIdAndUpdate(id, {name, lastName, age, email, password })
        if(user)
            res.status(200).send({respuesta: 'OK', mensaje: user})
        else
            res.status(404).send({respuesta: 'Error en actualizar usuario', mensaje:"User Not Found",})
    } catch (error) {
        res.status(400).send({respuesta: "Error en actualizar usuario", mensaje: error})
    }
}

export const deleteUserById = async (req, res) => {
    const {id} = req.params
    try{
        const user = await userModel.findByIdAndDelete(id)
        if(user)
            res.status(200).send({respuesta: 'OK', mensaje: user})
        else
            res.status(404).send({respuesta: 'Error en eliminar usuario', mensaje:"User Not Found",})
    } catch (error) {
        res.status(400).send({respuesta: "Error en eliminar usuario", mensaje: error})
    }
}

const recoveryLinks = {}
export const recoveryPassword = (req, res) => {
    const {email} = req.body
    
    try {
        const token = crypto.randomBytes(20).toString('hex')
        
        recoveryLinks[token] = {email: email, timestamp: Date.now()}
        
        const recoveryLink = `http://localhost:8080/api/users/reset-password/${token}`

        sendRecoveryMail(email, recoveryLink)

        res.status(200).send('Correo de recuperación enviado')
    } catch (error) {
        res.status(500).send(`Error al enviar el mail ${error}`)
    }
    

}

export const resetPassword = async (req, res) => {
    const { token} = req.params;
    const { newPassword, newPassword2 } = req.body;
  
    try {
      const linkData = recoveryLinks[token];
      if (linkData && Date.now() - linkData.timestamp <= 3600000) {
        const { email } = linkData;
        if (newPassword === newPassword2) {
          delete recoveryLinks[token];
          const userId = await getUserByEmail(email);
          if (userId) {
            const user = await userModel.findByIdAndUpdate(userId, {
              password: createHash(newPassword),
            });
            res
              .status(200)
              .send({ respuesta: 'Contraseña modificada correctamente', mensaje: user });
          } else {
            res.status(404).send({ respuesta: 'Usuario no encontrado' });
          }
        } else {
          res.status(400).send('Las contraseñas deben ser identicas');
        }
      } else {
        res.status(400).send('Token invalido o expirado, pruebe nuevamente');
      }
    } catch (error) {
      res.status(500).send(`Error al modificar contraseña ${error}`);
    }
  };
  
  const getUserByEmail = async (email) => {
    const user = await userModel.findOne({ email });
    if (user) {
      return user._id;
    } else {
      return null;
    }
  };