/**
 * Servicio de envío de correos usando la API HTTP de Brevo.
 * Usa peticiones HTTPS (puerto 443), evitando bloqueos de SMTP en Render.
 */
const enviarCorreoBrevo = async (toEmail, subject, htmlContent) => {
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
    console.log('Correo enviado exitosamente! ID:', data.messageId);
    return true;
  } catch (error) {
    console.error('Error enviando con Brevo HTTP:', error.message);
    return false;
  }
};

/**
 * Notifica al paciente que su turno fue confirmado.
 */
const enviarEmailTurnoSolicitado = async (emailDestino, datosTurno) => {
  const { fecha, horario, medicoNombre, medicoTipo } = datosTurno;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
      <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 10px;">Turno Confirmado</h2>
      <p>Hola, tu solicitud de turno ha sido confirmada exitosamente.</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <p><strong>📅 Fecha:</strong> ${fecha}</p>
        <p><strong>⏰ Horario:</strong> ${horario} hs</p>
        <p><strong>👨‍⚕️ Profesional:</strong> Dr/a. ${medicoNombre}</p>
        <p><strong>🩺 Especialidad:</strong> ${medicoTipo}</p>
      </div>
      <p>Recuerda asistir 10 minutos antes del horario programado.</p>
      <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">Correo generado automáticamente.</p>
    </div>
  `;
  return await enviarCorreoBrevo(emailDestino, '✅ Turno Confirmado Exitosamente', html);
};

/**
 * Notifica al paciente que su turno fue cancelado por el médico.
 */
const enviarEmailCancelacionPorMedico = async (emailPaciente, datosTurno) => {
  const { fecha, horario, medicoNombre } = datosTurno;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
      <h2 style="color: #dc3545; border-bottom: 2px solid #dc3545; padding-bottom: 10px;">Turno Cancelado por el Médico</h2>
      <p>Hola, lamentamos informarte que el médico ha cancelado tu turno.</p>
      <div style="background-color: #fff3f3; padding: 15px; border-left: 5px solid #dc3545; border-radius: 5px; margin: 15px 0;">
        <p><strong>📅 Fecha:</strong> ${fecha}</p>
        <p><strong>⏰ Horario:</strong> ${horario} hs</p>
        <p><strong>👨‍⚕️ Médico:</strong> Dr/a. ${medicoNombre}</p>
      </div>
      <p>Ingresá al sistema para solicitar un nuevo turno.</p>
      <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">Correo generado automáticamente.</p>
    </div>
  `;
  return await enviarCorreoBrevo(emailPaciente, '❌ Tu turno fue cancelado por el médico', html);
};

/**
 * Notifica al médico que el paciente canceló el turno.
 */
const enviarEmailCancelacionPorPaciente = async (emailMedico, datosTurno) => {
  const { fecha, horario, pacienteNombre } = datosTurno;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
      <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Cancelación de Turno por Paciente</h2>
      <p>Estimado/a Doctor/a, el paciente ha cancelado su turno.</p>
      <div style="background-color: #fff7ed; padding: 15px; border-left: 5px solid #f97316; border-radius: 5px; margin: 15px 0;">
        <p><strong>📅 Fecha:</strong> ${fecha}</p>
        <p><strong>⏰ Horario:</strong> ${horario} hs</p>
        <p><strong>👤 Paciente:</strong> ${pacienteNombre}</p>
      </div>
      <p>El turno quedó disponible nuevamente en el sistema.</p>
      <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">Correo generado automáticamente.</p>
    </div>
  `;
  return await enviarCorreoBrevo(emailMedico, '⚠️ Un paciente canceló su turno', html);
};

/**
 * Recordatorio automático: se envía al paciente 24hs antes de su turno.
 */
const enviarEmailRecordatorio = async (emailPaciente, datosTurno) => {
  const { fecha, horario, medicoNombre, medicoTipo } = datosTurno;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
      <h2 style="color: #0891b2; border-bottom: 2px solid #0891b2; padding-bottom: 10px;">⏰ Recordatorio de Turno — Mañana</h2>
      <p>Hola, te recordamos que tenés un turno médico programado para <strong>mañana</strong>.</p>
      <div style="background-color: #f0f9ff; padding: 15px; border-left: 5px solid #0891b2; border-radius: 5px; margin: 15px 0;">
        <p><strong>📅 Fecha:</strong> ${fecha}</p>
        <p><strong>⏰ Horario:</strong> ${horario} hs</p>
        <p><strong>👨‍⚕️ Profesional:</strong> Dr/a. ${medicoNombre}</p>
        <p><strong>🩺 Especialidad:</strong> ${medicoTipo}</p>
      </div>
      <p>🟡 Por favor, recordá llegar <strong>10 minutos antes</strong> del horario asignado.</p>
      <p>Si no podés asistir, por favor ingresá al sistema y cancela el turno con anticipación.</p>
      <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">Este es un recordatorio automático. Por favor, no respondas a este mensaje.</p>
    </div>
  `;
  return await enviarCorreoBrevo(emailPaciente, '⏰ Recordatorio: Tenés un turno médico mañana', html);
};

module.exports = {
  enviarEmailTurnoSolicitado,
  enviarEmailCancelacionPorMedico,
  enviarEmailCancelacionPorPaciente,
  enviarEmailRecordatorio,
};
