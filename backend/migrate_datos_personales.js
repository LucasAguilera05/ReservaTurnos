const sequelize = require('./config/dataBase');

async function migrate() {
    try {
        console.log("Iniciando migración de datos personales...");

        // 1. Añadir columnas a pacientes y medicos
        const tables = ['pacientes', 'medicos'];
        const columns = ['dni', 'nombre', 'apellido', 'telefono', 'direccion'];
        for (let t of tables) {
            for (let c of columns) {
                try { await sequelize.query(`ALTER TABLE ${t} ADD COLUMN ${c} VARCHAR(255) DEFAULT NULL`); } catch(e) {}
            }
        }

        // 2. Crear tabla administradores
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS \`administradores\` (
              \`id\` int(11) NOT NULL AUTO_INCREMENT,
              \`dni\` varchar(255) DEFAULT NULL,
              \`nombre\` varchar(255) DEFAULT NULL,
              \`apellido\` varchar(255) DEFAULT NULL,
              \`telefono\` varchar(255) DEFAULT NULL,
              \`direccion\` varchar(255) DEFAULT NULL,
              PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        `);

        // 3. Añadir adminId a usuarios
        try { await sequelize.query(`ALTER TABLE usuarios ADD COLUMN adminId INT DEFAULT NULL`); } catch(e) {}

        // 4. Copiar datos desde usuarios a pacientes
        console.log("Copiando a pacientes...");
        await sequelize.query(`UPDATE pacientes p INNER JOIN usuarios u ON u.pacienteId = p.id SET p.dni = u.dni, p.nombre = u.nombre, p.apellido = u.apellido, p.telefono = u.telefono, p.direccion = u.direccion`);

        // 5. Copiar datos desde usuarios a medicos
        console.log("Copiando a medicos...");
        await sequelize.query(`UPDATE medicos m INNER JOIN usuarios u ON u.medicoId = m.id SET m.dni = u.dni, m.nombre = u.nombre, m.apellido = u.apellido, m.telefono = u.telefono, m.direccion = u.direccion`);

        // 6. Migrar Administradores
        console.log("Migrando Administradores...");
        const [admins] = await sequelize.query(`SELECT * FROM usuarios WHERE rol = 'administrador' OR rol = 'Administrador'`);
        for (let admin of admins) {
            if (!admin.adminId) {
                const query = `INSERT INTO administradores (dni, nombre, apellido, telefono, direccion) VALUES ('${admin.dni}', '${admin.nombre}', '${admin.apellido}', '${admin.telefono}', '${admin.direccion}')`;
                const [result, metadata] = await sequelize.query(query);
                // `result` holds the insert ID in MySQL mapping via Sequelize
                await sequelize.query(`UPDATE usuarios SET adminId = ${result} WHERE id = ${admin.id}`);
            }
        }

        // Establecer llave foranea admin
        try { await sequelize.query('ALTER TABLE usuarios ADD CONSTRAINT fk_usuario_admin FOREIGN KEY (adminId) REFERENCES administradores(id) ON DELETE SET NULL ON UPDATE CASCADE'); } catch(e){}

        // 7. Borrar columnas originales en usuarios
        console.log("Eliminando columnas huérfanas en usuarios...");
        for (let c of columns) {
            try { await sequelize.query(`ALTER TABLE usuarios DROP COLUMN ${c}`); } catch(e) {}
        }

        console.log("¡Migración completada exitosamente!");
        process.exit(0);
    } catch (e) {
        console.error("Error en migración:", e);
        process.exit(1);
    }
}

migrate();
