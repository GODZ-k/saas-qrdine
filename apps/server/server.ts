import { connectDatabase } from "./src/config/database.js";
import app from "./src/app.js";
import { PORT } from "./src/config/config.js";


connectDatabase().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}).catch((error:any)=>{
    console.log(`Error listning the port ${PORT}` , error)
    
})

