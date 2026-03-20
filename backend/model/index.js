const Turno = require('./Turno');
const Medico = require('./Medico');
const Paciente = require('./Paciente');
const Usuario = require('./Usuario');
const Administrador = require('./Administrador');

// Definir Relaciones (El Usuario ahora contiene las llaves foráneas apuntando a sus perfiles)
Usuario.belongsTo(Paciente, { foreignKey: 'pacienteId', as: 'pacienteData', onDelete: 'SET NULL' });
Paciente.hasOne(Usuario, { foreignKey: 'pacienteId' });

Usuario.belongsTo(Medico, { foreignKey: 'medicoId', as: 'medicoData', onDelete: 'SET NULL' });
Medico.hasOne(Usuario, { foreignKey: 'medicoId' });

Usuario.belongsTo(Administrador, { foreignKey: 'adminId', as: 'adminData', onDelete: 'SET NULL' });
Administrador.hasOne(Usuario, { foreignKey: 'adminId' });

module.exports = { Turno, Medico, Paciente, Usuario, Administrador };
