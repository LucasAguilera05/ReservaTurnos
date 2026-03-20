const fs = require('fs');
const path = require('path');
const { Usuario, Paciente, Medico, Administrador, Turno } = require('./model');

async function dumpData() {
  try {
    let sql = `-- phpMyAdmin SQL Dump
-- Base de datos: \`reserva_turnos\`
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Estructura de tabla para la tabla \`pacientes\`
CREATE TABLE IF NOT EXISTS \`pacientes\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`dni\` varchar(255) DEFAULT NULL,
  \`nombre\` varchar(255) DEFAULT NULL,
  \`apellido\` varchar(255) DEFAULT NULL,
  \`telefono\` varchar(255) DEFAULT NULL,
  \`direccion\` varchar(255) DEFAULT NULL,
  \`edad\` int(11) DEFAULT NULL,
  \`peso\` int(11) DEFAULT NULL,
  \`altura\` decimal(10,2) DEFAULT NULL,
  \`sexo\` varchar(255) DEFAULT NULL,
  \`historial\` text DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

`;

    const pacientes = await Paciente.findAll({ raw: true });
    if (pacientes.length > 0) {
      sql += `-- Volcando datos para la tabla \`pacientes\`\nINSERT INTO \`pacientes\` (\`id\`, \`dni\`, \`nombre\`, \`apellido\`, \`telefono\`, \`direccion\`, \`edad\`, \`peso\`, \`altura\`, \`sexo\`, \`historial\`) VALUES\n`;
      const pValues = pacientes.map(p => {
        const pHistorial = p.historial ? `'${p.historial.replace(/'/g, "''")}'` : 'NULL';
        const pSexo = p.sexo ? `'${p.sexo}'` : 'NULL';
        return `(${p.id}, ${p.dni ? `'${p.dni}'` : 'NULL'}, ${p.nombre ? `'${p.nombre}'` : 'NULL'}, ${p.apellido ? `'${p.apellido}'` : 'NULL'}, ${p.telefono ? `'${p.telefono}'` : 'NULL'}, ${p.direccion ? `'${p.direccion}'` : 'NULL'}, ${p.edad || 'NULL'}, ${p.peso || 'NULL'}, ${p.altura || 'NULL'}, ${pSexo}, ${pHistorial})`;
      });
      sql += pValues.join(',\n') + ';\n\n';
    }

    sql += `-- Estructura de tabla para la tabla \`medicos\`
CREATE TABLE IF NOT EXISTS \`medicos\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`dni\` varchar(255) DEFAULT NULL,
  \`nombre\` varchar(255) DEFAULT NULL,
  \`apellido\` varchar(255) DEFAULT NULL,
  \`telefono\` varchar(255) DEFAULT NULL,
  \`direccion\` varchar(255) DEFAULT NULL,
  \`especialidad\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

`;

    const medicos = await Medico.findAll({ raw: true });
    if (medicos.length > 0) {
      sql += `-- Volcando datos para la tabla \`medicos\`\nINSERT INTO \`medicos\` (\`id\`, \`dni\`, \`nombre\`, \`apellido\`, \`telefono\`, \`direccion\`, \`especialidad\`) VALUES\n`;
      const mValues = medicos.map(m => `(${m.id}, ${m.dni ? `'${m.dni}'` : 'NULL'}, ${m.nombre ? `'${m.nombre}'` : 'NULL'}, ${m.apellido ? `'${m.apellido}'` : 'NULL'}, ${m.telefono ? `'${m.telefono}'` : 'NULL'}, ${m.direccion ? `'${m.direccion}'` : 'NULL'}, ${m.especialidad ? `'${m.especialidad}'` : 'NULL'})`);
      sql += mValues.join(',\n') + ';\n\n';
    }

    sql += `-- Estructura de tabla para la tabla \`administradores\`
CREATE TABLE IF NOT EXISTS \`administradores\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`dni\` varchar(255) DEFAULT NULL,
  \`nombre\` varchar(255) DEFAULT NULL,
  \`apellido\` varchar(255) DEFAULT NULL,
  \`telefono\` varchar(255) DEFAULT NULL,
  \`direccion\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

`;

    const admins = await Administrador.findAll({ raw: true });
    if (admins.length > 0) {
      sql += `-- Volcando datos para la tabla \`administradores\`\nINSERT INTO \`administradores\` (\`id\`, \`dni\`, \`nombre\`, \`apellido\`, \`telefono\`, \`direccion\`) VALUES\n`;
      const aValues = admins.map(a => `(${a.id}, ${a.dni ? `'${a.dni}'` : 'NULL'}, ${a.nombre ? `'${a.nombre}'` : 'NULL'}, ${a.apellido ? `'${a.apellido}'` : 'NULL'}, ${a.telefono ? `'${a.telefono}'` : 'NULL'}, ${a.direccion ? `'${a.direccion}'` : 'NULL'})`);
      sql += aValues.join(',\n') + ';\n\n';
    }

    sql += `-- Estructura de tabla para la tabla \`usuarios\`
CREATE TABLE IF NOT EXISTS \`usuarios\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`email\` varchar(255) NOT NULL,
  \`password\` varchar(255) NOT NULL,
  \`passwordConfirm\` varchar(255) NOT NULL,
  \`rol\` varchar(255) DEFAULT 'Paciente',
  \`pacienteId\` int(11) DEFAULT NULL,
  \`medicoId\` int(11) DEFAULT NULL,
  \`adminId\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`fk_usuario_paciente_idx\` (\`pacienteId\`),
  KEY \`fk_usuario_medico_idx\` (\`medicoId\`),
  KEY \`fk_usuario_admin_idx\` (\`adminId\`),
  CONSTRAINT \`fk_usuario_paciente\` FOREIGN KEY (\`pacienteId\`) REFERENCES \`pacientes\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT \`fk_usuario_medico\` FOREIGN KEY (\`medicoId\`) REFERENCES \`medicos\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT \`fk_usuario_admin\` FOREIGN KEY (\`adminId\`) REFERENCES \`administradores\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

`;

    const usuarios = await Usuario.findAll({ raw: true });
    if (usuarios.length > 0) {
      sql += `-- Volcando datos para la tabla \`usuarios\`\nINSERT INTO \`usuarios\` (\`id\`, \`email\`, \`password\`, \`passwordConfirm\`, \`rol\`, \`pacienteId\`, \`medicoId\`, \`adminId\`) VALUES\n`;
      const values = usuarios.map(u => `(${u.id}, '${u.email}', '${u.password}', '${u.passwordConfirm}', '${u.rol}', ${u.pacienteId || 'NULL'}, ${u.medicoId || 'NULL'}, ${u.adminId || 'NULL'})`);
      sql += values.join(',\n') + ';\n\n';
    }

    sql += `-- Estructura de tabla para la tabla \`turnos\`
CREATE TABLE IF NOT EXISTS \`turnos\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`fecha\` varchar(255) NOT NULL,
  \`horario\` varchar(255) NOT NULL,
  \`medicoId\` varchar(255) NOT NULL,
  \`medicoNombre\` varchar(255) NOT NULL,
  \`medicoTipo\` varchar(255) NOT NULL,
  \`pacienteId\` varchar(255) DEFAULT 'Ninguno',
  \`pacienteNombre\` varchar(255) DEFAULT 'Ninguno',
  \`estado\` varchar(255) DEFAULT 'Pendiente',
  \`diagnostico\` text DEFAULT NULL,
  \`tratamiento\` text DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

`;

    const turnos = await Turno.findAll({ raw: true });
    if (turnos.length > 0) {
      sql += `-- Volcando datos para la tabla \`turnos\`\nINSERT INTO \`turnos\` (\`id\`, \`fecha\`, \`horario\`, \`medicoId\`, \`medicoNombre\`, \`medicoTipo\`, \`pacienteId\`, \`pacienteNombre\`, \`estado\`, \`diagnostico\`, \`tratamiento\`) VALUES\n`;
      const tValues = turnos.map(t => {
        const diag = t.diagnostico ? `'${t.diagnostico.replace(/'/g, "''")}'` : 'NULL';
        const trat = t.tratamiento ? `'${t.tratamiento.replace(/'/g, "''")}'` : 'NULL';
        return `(${t.id}, '${t.fecha}', '${t.horario}', '${t.medicoId}', '${t.medicoNombre}', '${t.medicoTipo}', '${t.pacienteId}', '${t.pacienteNombre}', '${t.estado}', ${diag}, ${trat})`;
      });
      sql += tValues.join(',\n') + ';\n\n';
    }

    sql += `COMMIT;\n/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;\n/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;\n/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;\n`;

    fs.writeFileSync(path.join(__dirname, '../script_reserva_turnos_actualizada.sql'), sql, 'utf8');
    console.log('Database dump successful.');
    process.exit(0);

  } catch (error) {
    console.error('Error dumping database:', error);
    process.exit(1);
  }
}

dumpData();
