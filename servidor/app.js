require("dotenv").config();
const express = require("express");
const cors = require ("cors");
const mysql = require("mysql");
const app = express();
const puerto = process.env.PUERTO||3000

// CONEXION A BASE DE DATOS

const conexion = mysql.createConnection({
  host:process.env.HOST,
  database:process.env.DATABASE,
  user:process.env.USER,
  password:process.env.PASSWORD
})


conexion.connect((error) =>{
  if (error) {
    throw error;
  }
})

//==============================

app.use(cors());

app.use(express.json({
  type:"*/*"
}))

app.post('/registroUsuario',(req,res)=>{

  let dataInfo = req.body; //OBTENGO LOS DATOS QUE LLEGAN DEL CLIENTE
  let tipo = "natural";
  let documento = parseInt(dataInfo.documento); // TRANSFORMAMOS EL DOCUMENTO EN UN ENTERO PARA PODER INSERTARLO EN LA TABLA

  //MYSLQ CONSULTA ===============
  //PREPARAMOS CONSULTA CON TODOS LOS PARAMETROS
  let consulta = "INSERT INTO usuarios (nombre_usuario, tipo_documento, documento, correo, celular, contraseña, tipo_usuario) VALUES ('"+dataInfo.nombre+"','"+dataInfo.tipo_documento+"',"+documento+",'"+dataInfo.correo+"',"+dataInfo.celular+",'"+dataInfo.contraseña+"','"+tipo+"')";
  conexion.query(consulta,(error)=>{
    if (error) {
      throw error;
    }else{
      let respuesta = {
        "estado":true,
      }
      res.send(JSON.stringify(respuesta)); // DEVOLVEMOS UNA RESPUESTA AL CLIENTE
    }
  });
})

app.post("/loginUsuario",(req,res)=>{
  let data = req.body;
  let documento = parseInt(data.documento);
  let consulta = "SELECT nombre_usuario, tipo_documento, documento, contraseña, tipo_usuario FROM usuarios WHERE documento = " + documento
  conexion.query(consulta,(error,resultado,filas)=>{
    if (error) throw error;
    if (resultado[0] !== undefined) {
      if (data.contraseña === resultado[0].contraseña) {
        res.send(JSON.stringify({
          "estado":true,
          "tipo_usuario":resultado[0].tipo_usuario,
          "nombre_usuario":resultado[0].nombre_usuario
          }))
      }else {
        res.send(JSON.stringify({
          "estado":false
        }))
      }
    }else {
      res.send(JSON.stringify({
        "estado":false,
      }))
    }
    
  })
})

app.post("/pedirCita",(req,res)=>{
  let datos = req.body;
  let consulta = "SELECT * FROM usuarios WHERE nombre_usuario = '"+datos.nombre_usuario+"'";
  conexion.query(consulta,(error,resultado)=>{
    if (error) {
      throw error;
    }else if (resultado[0] !== undefined) {
      let nombre_usuario = resultado[0].nombre_usuario;
      let documento = resultado[0].documento;
      let correo = resultado[0].correo;
      let celular = resultado[0].celular;
      let dia = datos.dia;
      let hora = datos.horaDato;
      let ampm = datos.ampm
      let nota = datos.nota;
      let consulta = `INSERT INTO reservas (nombre_usuario,documento,correo,celular,fecha,hora,ampm,nota,estado) VALUES ('${nombre_usuario}',${documento},'${correo}',${celular},'${dia}','${hora}','${ampm}','${nota}','Pendiente')`;
      conexion.query(consulta,(error,resultado)=>{
        if (error) {
          throw error;
        }
        res.send(JSON.stringify({
          "estado":true
        }))
      })
    }
  })
})

app.post("/obtenerInformacionUsuario",(req,res)=>{
  let nombre = req.body.nombre_usuario
  let consulta = "SELECT * FROM usuarios WHERE nombre_usuario = '"+nombre+"'"
  conexion.query(consulta,(error,resultado)=>{
    if (error) {
      throw error
    }
    res.send(JSON.stringify(resultado[0]));
  })
})

app.post("/InformacionCitasUsuario",(req,res)=>{
  let nombre = req.body.nombre_usuario
  let consulta = "SELECT * FROM reservas WHERE nombre_usuario = '"+nombre+"'";
  conexion.query(consulta,(error,resultado)=>{
    if (error) {
      throw error
    }
    res.send(JSON.stringify(resultado));
  })
})
app.post("/informacionCitas",(req,res)=>{
  let consulta = "SELECT * FROM reservas"
  conexion.query(consulta,(error,resultado)=>{
    if (error) {
      throw error
    }else {
      res.send(JSON.stringify(resultado))
    }
  })
})
app.post("/confirmarCita",(req,res)=>{
  let id = req.body.id_cita;
  let consulta = "UPDATE reservas SET estado = 'Confirmada' WHERE id_cita = "+id
  conexion.query(consulta,(error,resultado)=>{
    if (error) {
      throw error
    }else {
      let mensaje = {"estado":true}
      res.send(JSON.stringify(mensaje))
    }
  })
})
app.post("/rechazarCita",(req,res)=>{
  let id = req.body.id_cita;
  let consulta = "UPDATE reservas SET estado = 'Rechazada' WHERE id_cita = "+id
  conexion.query(consulta,(error,resultado)=>{
    if (error) {
      throw error
    }else {
      let mensaje = {"estado":true}
      res.send(JSON.stringify(mensaje))
    }
  })
})
app.post("/eliminarCita",(req,res)=>{

  let id = req.body.id;

  let consulta = "DELETE FROM reservas WHERE id_cita = "+id;

  conexion.query(consulta,(error)=>{

    if (error) {

      throw error

    }else {

      let mensaje = {"estado":true,}
      res.send(JSON.stringify(mensaje));
    }
  })
})
app.post("/obtenerLimitesFechas",(req,res)=>{
  let consulta = "SELECT * FROM horarios";
  conexion.query(consulta,(error,resultado)=>{
    if (error) {
      throw error
    }else{
      res.send(JSON.stringify(resultado))
    }
  })
})
app.post("/verificarDisponibilidad",(req,res)=>{
  let datos = req.body
  console.log(datos.hora);
  let consulta = `SELECT hora, fecha, ampm FROM reservas WHERE hora = '${datos.hora}' AND fecha = '${datos.fecha}' AND ampm = '${datos.ampm}'`
  conexion.query(consulta,(error,resultado,filas)=>{
    if (error) {
      throw error
    }
    if (resultado[0]) {
      res.send(JSON.stringify({"estado":true}))
    }else {
      res.send(JSON.stringify({"estado":false}))
    }
  })
})
app.post("/obtenerHorarioPrevio",(req,res)=>{
  let consulta = "SELECT * FROM horarios"
  conexion.query(consulta,(error,resultado)=>{
    if (error) {
      throw error
    }else {
      res.send(JSON.stringify(resultado[0]))
    }
  })
})
app.post("/guardarHorario",(req,res)=>{
  let datos = req.body;
  let tiempoInicio = datos.horaInicio + ":" + datos.minutosInicio
  let tiempoCierre = datos.horaCierre + ":" + datos.minutosCierre
  let consulta = `UPDATE horarios SET fecha_inicio = '${datos.fechaInicio}', fecha_final = '${datos.fechaCierre}', hora_inicial = '${tiempoInicio}', ampmInicial = '${datos.ampmInicio}', hora_final = '${tiempoCierre}', ampmFinal = '${datos.ampmCierre}' WHERE id_horario = 1`
  conexion.query(consulta,(error)=>{
    if (error) {
      throw error
    }else {
      res.send(JSON.stringify({
        "estado":true
      }))
    }
  })
})
app.post("/reprogramarCita",(req,res)=>{
  let datos = req.body
  let consulta = `UPDATE reservas SET fecha = '${datos.diaNuevo}', hora = '${datos.horaNueva}', estado = 'Reprogramada' WHERE id_cita = ${datos.id_cita}`
  conexion.query(consulta,(error,resultado)=>{
    if(error){
      throw error
    }else {
      res.send(JSON.stringify({"estado":true}))
    }
  })
})

app.listen(puerto)
