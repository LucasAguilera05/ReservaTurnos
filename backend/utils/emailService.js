const nodemailer = require('nodemailer');

// Configuración del Transporter para enviar correos.
// Toma las credenciales desde las variables de entorno.
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true para port 465, false para 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  family: 4 // Forza a Node.js a usar IPv4 en lugar de IPv6 al conectarse
});

/**
 * Envía un correo de confirmación al paciente cuando su turno pasa a estado Confirmado.
 * @param {string} emailDestino Email del paciente
 * @param {object} datosTurno Objeto con la información del turno
 */
const enviarEmailTurnoSolicitado = async (emailDestino, datosTurno) => {
  try {
    const { fecha, horario, medicoNombre, medicoTipo } = datosTurno;
    
    const mailOptions = {
      from: `"Sistema de Turnos Médicos" <${process.env.EMAIL_USER}>`,
      to: emailDestino,
      subject: '✅ Turno Confirmado Exitosamente',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
          <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px;">Turno Confirmado</h2>
          <p>Hola,</p>
          <p>Tu solicitud de turno ha sido confirmada exitosamente. Aquí tienes los detalles de tu cita:</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong><span style="font-size: 16px;">📅 Fecha:</span></strong> ${fecha}</p>
            <p><strong><span style="font-size: 16px;">⏰ Horario:</span></strong> ${horario} hs</p>
            <p><strong><span style="font-size: 16px;">👨‍⚕️ Profesional:</span></strong> Dr/a. ${medicoNombre}</p>
            <p><strong><span style="font-size: 16px;">🩺 Especialidad:</span></strong> ${medicoTipo}</p>
          </div>
          <p>Por favor, recuerda asistir 10 minutos antes del horario programado.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">
            Este es un correo generado automáticamente. Por favor, no respondas a este mensaje.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo de turno solicitado enviado: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error enviando el correo de confirmación:', error);
    return false;
  }
};

/**
 * Envía un correo al paciente notificando la cancelación del turno por parte del médico.
 * @param {string} emailDestino Email del paciente
 * @param {object} datosTurno Objeto con la información del turno
 */
const enviarEmailTurnoCancelado = async (emailDestino, datosTurno) => {
  try {
    const { fecha, horario, medicoNombre } = datosTurno;
    
    const mailOptions = {
      from: `"Sistema de Turnos Médicos" <${process.env.EMAIL_USER}>`,
      to: emailDestino,
      subject: '❌ Turno Cancelado',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
          <h2 style="color: #dc3545; border-bottom: 2px solid #dc3545; padding-bottom: 10px;">Turno Cancelado</h2>
          <p>Hola,</p>
          <p>Lamentamos informarte que tu turno programado ha sido cancelado por el profesional médico.</p>
          <div style="background-color: #fff3f3; padding: 15px; border-left: 5px solid #dc3545; border-radius: 5px; margin: 15px 0;">
            <p><strong>📅 Fecha Original:</strong> ${fecha}</p>
            <p><strong>⏰ Horario Original:</strong> ${horario} hs</p>
            <p><strong>👨‍⚕️ Profesional:</strong> Dr/a. ${medicoNombre}</p>
          </div>
          <p>Te invitamos a ingresar al sistema para solicitar un nuevo turno disponible que se ajuste a tus horarios.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">
            Este es un correo generado automáticamente. Por favor, no respondas a este mensaje.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo de turno cancelado enviado: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error enviando el correo de cancelación:', error);
    return false;
  }
};

module.exports = {
  enviarEmailTurnoSolicitado,
  enviarEmailTurnoCancelado,
};
