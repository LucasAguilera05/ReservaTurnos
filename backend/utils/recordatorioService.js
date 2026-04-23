const cron = require('node-cron');
const { Op } = require('sequelize');
const Turno = require('../model/Turno');
const Usuario = require('../model/Usuario');
const { enviarEmailRecordatorio } = require('./emailService');

/**
 * Busca todos los turnos confirmados para mañana y envía un recordatorio
 * por email a cada paciente.
 */
const enviarRecordatorios = async () => {
  try {
    // Calcular fecha de mañana en formato YYYY-MM-DD
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    const dia = String(manana.getDate()).padStart(2, '0');
    const mes = String(manana.getMonth() + 1).padStart(2, '0');
    const anio = manana.getFullYear();
    const fechaManana = `${anio}-${mes}-${dia}`;

    console.log(`[Recordatorios] Buscando turnos confirmados para: ${fechaManana}`);

    // Buscar turnos confirmados para mañana con paciente asignado
    const turnos = await Turno.findAll({
      where: {
        fecha: fechaManana,
        estado: 'Confirmado',
        pacienteId: {
          [Op.and]: [
            { [Op.ne]: null },
            { [Op.ne]: 'Ninguno' }
          ]
        }
      }
    });

    console.log(`[Recordatorios] Se encontraron ${turnos.length} turnos para mañana.`);

    let enviados = 0;
    for (const turno of turnos) {
      const paciente = await Usuario.findByPk(turno.pacienteId);
      if (paciente && paciente.email) {
        const resultado = await enviarEmailRecordatorio(paciente.email, turno);
        if (resultado) enviados++;
      }
    }

    console.log(`[Recordatorios] ✅ Recordatorios enviados: ${enviados}/${turnos.length}`);
  } catch (error) {
    console.error('[Recordatorios] ❌ Error al enviar recordatorios:', error.message);
  }
};

/**
 * Inicializa el job de recordatorios.
 * Corre todos los días a las 8:00 AM hora Argentina.
 * 
 * Para probar, cambia '0 8 * * *' por '* * * * *' (cada minuto).
 */
const iniciarJobRecordatorios = () => {
  cron.schedule('* * * * *', () => {
    console.log('[Recordatorios] Ejecutando job de recordatorios...');
    enviarRecordatorios();
  }, {
    timezone: 'America/Argentina/Buenos_Aires'
  });

  console.log('✅ Job de recordatorios iniciado — corre todos los días a las 8:00 AM (ARG)');
};

module.exports = { iniciarJobRecordatorios, enviarRecordatorios };
