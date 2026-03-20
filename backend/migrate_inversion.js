const sequelize = require('./config/dataBase');

async function migrate() {
    try {
        console.log("Iniciando migración...");

        // 1. Añadir columnas a usuarios (ignorar errores si ya existen)
        try { await sequelize.query('ALTER TABLE usuarios ADD COLUMN pacienteId INT DEFAULT NULL'); } catch(e){}
        try { await sequelize.query('ALTER TABLE usuarios ADD COLUMN medicoId INT DEFAULT NULL'); } catch(e){}

        // 2. Traspasar datos: mapear pacienteId y medicoId de regreso a las filas del usuario original
        console.log("Traspasando mapeo de llaves foráneas...");
        await sequelize.query('UPDATE usuarios u INNER JOIN pacientes p ON p.usuarioId = u.id SET u.pacienteId = p.id');
        await sequelize.query('UPDATE usuarios u INNER JOIN medicos m ON m.usuarioId = u.id SET u.medicoId = m.id');

        // 3. Eliminar llaves foráneas antiguas de pacientes y medicos
        console.log("Borrando viejas llaves foráneas y columnas usuarioId...");
        try { await sequelize.query('ALTER TABLE pacientes DROP FOREIGN KEY fk_pacientes_usuario'); } catch(e){}
        try { await sequelize.query('ALTER TABLE medicos DROP FOREIGN KEY fk_medicos_usuario'); } catch(e){}
        try { await sequelize.query('ALTER TABLE pacientes DROP FOREIGN KEY pacientes_ibfk_1'); } catch(e){}
        try { await sequelize.query('ALTER TABLE medicos DROP FOREIGN KEY medicos_ibfk_1'); } catch(e){}

        try { await sequelize.query('ALTER TABLE pacientes DROP COLUMN usuarioId'); } catch(e){}
        try { await sequelize.query('ALTER TABLE medicos DROP COLUMN usuarioId'); } catch(e){}

        // 4. Establecer las nuevas llaves foráneas en usuarios
        console.log("Estableciendo nuevas restricciones referenciales...");
        try { await sequelize.query('ALTER TABLE usuarios ADD CONSTRAINT fk_usuario_paciente FOREIGN KEY (pacienteId) REFERENCES pacientes(id) ON DELETE SET NULL ON UPDATE CASCADE'); } catch(e){}
        try { await sequelize.query('ALTER TABLE usuarios ADD CONSTRAINT fk_usuario_medico FOREIGN KEY (medicoId) REFERENCES medicos(id) ON DELETE SET NULL ON UPDATE CASCADE'); } catch(e){}

        console.log("¡Migración y cambio de llaves foráneas completada exitosamente!");
        process.exit(0);

    } catch (error) {
        console.error("Error crítico durante la migración:", error);
        process.exit(1);
    }
}

migrate();
