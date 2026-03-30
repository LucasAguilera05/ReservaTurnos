const sequelize = require('./config/dataBase');
const { Usuario, Paciente } = require('./model');

async function testDB() {
  try {
    // Buscar todos los usuarios recientes
    const usuarios = await Usuario.findAll({
      order: [['id', 'DESC']],
      limit: 3,
      include: [{ model: Paciente, as: 'pacienteData' }]
    });

    console.log(JSON.stringify(usuarios, null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

testDB();
