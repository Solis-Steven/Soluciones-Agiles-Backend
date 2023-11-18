import mongoose from "mongoose";

// This function make connection with the database
const dataBaseConnection = async() => {
    try {
        const connection = await mongoose.connect(
            "mongodb+srv://solucionesAgiles:solucionesAgiles@cluster0.gersibl.mongodb.net/?retryWrites=true&w=majority"
        );

        const url = `${connection.connection.host}: ${connection.connection.port}`;
        console.log(`Connected: ${url}`);
    } catch (error) {
        console.log(`Database connection error: ${error.message}`);
        process.exit(1);
    }
}

export default dataBaseConnection;