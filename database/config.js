const mongoose = require('mongoose');

// juan_caste02
// MiMegaClave123
// mongodb+srv://juan_caste02:<password>@cluster0.jqxbr.mongodb.net/test
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        });
        console.log('DB Conected Successfully ');
    } catch (error) {
        console.log(error);
        throw  Error('Error en la conexion con la base de datos - Hable con el admin');
        
    }
}
module.exports = {
    dbConnection
}