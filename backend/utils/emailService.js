/**
 * Envío de correos usando la API HTTP de Brevo (ex Sendinblue).
 * Esto evita los bloqueos del puerto SMTP en hostings como Render.
 */
const enviarCorreoBrevo = async (toEmail, subject, htmlContent) => {
  // Reutilizamos las mismas variables: 
  // EMAIL_USER será tu correo de Brevo. 
  // EMAIL_PASS será tu API Key de Brevo (xkeysib-...).
  const apiKey = process.env.EMAIL_PASS; 
  const senderEmail = process.env.EMAIL_USER; 

  const url = 'https://api.brevo.com/v3/smtp/email';
  
  const payload = {
    sender: { email: senderEmail, name: "Sistema de Turnos Médicos" },
    to: [{ email: toEmail }],
    subject: subject,
    htmlContent: htmlContent
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error de Brevo:', errorData);
        throw new Error('Fallo al enviar correo desde Brevo');
    }

    const data = await response.json();
    console.log('Correo enviado exitosamente mediante Brevo! ID:', data.messageId);
    return true;
  } catch (error) {
    console.error('Error enviando con Brevo HTTP:', error.message);
    return false;
  }
};

/**
 * Envía un correo de confirmación al paciente cuando su turno pasa a estado Confirmado.
 */
const enviarEmailTurnoSolicitado = async (emailDestino, datosTurno) => {
  const { fecha, horario, medicoNombre, medicoTipo } = datosTurno;
  
  const html = `
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
  `;

  return await enviarCorreoBrevo(emailDestino, '✅ Turno Confirmado Exitosamente', html);
};

/**
 * Envía un correo al paciente notificando la cancelación del turno por parte del médico.
 */
const enviarEmailTurnoCancelado = async (emailDestino, datosTurno) => {
  const { fecha, horario, medicoNombre } = datosTurno;
  
  const html = `
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
  `;

  return await enviarCorreoBrevo(emailDestino, '❌ Turno Cancelado', html);
};

/**
 * Notifica al PACIENTE que el MÉDICO canceló su turno.
 */
const enviarEmailCancelacionPorMedico = async (emailPaciente, datosTurno) => {
  const { fecha, horario, medicoNombre } = datosTurno;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
      <h2 style="color: #dc3545; border-bottom: 2px solid #dc3545; padding-bottom: 10px;">Turno Cancelado por el Médico</h2>
      <p>Hola,</p>
      <p>Lamentamos informarte que el médico ha cancelado tu turno programado.</p>
      <div style="background-color: #fff3f3; padding: 15px; border-left: 5px solid #dc3545; border-radius: 5px; margin: 15px 0;">
        <p><strong>📅 Fecha:</strong> ${fecha}</p>
        <p><strong>⏰ Horario:</strong> ${horario} hs</p>
        <p><strong>👨‍⚕️ Médico:</strong> Dr/a. ${medicoNombre}</p>
      </div>
      <p>Te invitamos a ingresar al sistema para solicitar un nuevo turno disponible.</p>
      <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">
        Este es un correo generado automáticamente. Por favor, no respondas a este mensaje.
      </p>
    </div>
  `;

  return await enviarCorreoBrevo(emailPaciente, '❌ Tu turno fue cancelado por el médico', html);
};

/**
 * Notifica al MÉDICO que el PACIENTE canceló el turno.
 */
const enviarEmailCancelacionPorPaciente = async (emailMedico, datosTurno) => {
  const { fecha, horario, pacienteNombre } = datosTurno;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
      <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Cancelación de Turno por Paciente</h2>
      <p>Estimado/a Doctor/a,</p>
      <p>Le informamos que el paciente ha cancelado su turno.</p>
      <div style="background-color: #fff7ed; padding: 15px; border-left: 5px solid #f97316; border-radius: 5px; margin: 15px 0;">
        <p><strong>📅 Fecha:</strong> ${fecha}</p>
        <p><strong>⏰ Horario:</strong> ${horario} hs</p>
        <p><strong>👤 Paciente:</strong> ${pacienteNombre}</p>
      </div>
      <p>El turno quedó disponible nuevamente en el sistema.</p>
      <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">
        Este es un correo generado automáticamente. Por favor, no respondas a este mensaje.
      </p>
    </div>
  `;

  return await enviarCorreoBrevo(emailMedico, '⚠️ Un paciente canceló su turno', html);
};

module.exports = {
  enviarEmailTurnoSolicitado,
  enviarEmailTurnoCancelado,
  enviarEmailCancelacionPorMedico,
  enviarEmailCancelacionPorPaciente,
};
