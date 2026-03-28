import app from "./src/app.js";
import config from "./src/config/config.js";
import { connectDb } from "./src/config/connectDb.js";

connectDb().then(() => {
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
}).catch((error) => {
    console.log("Failed to connect to DB: ", error.message);
});