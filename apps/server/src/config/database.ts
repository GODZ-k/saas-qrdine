// database connection and configuration
import prisma from "./db.config.js";

export const connectDatabase = async () => {
 await prisma.$connect().then(() => {
      console.log("Connected to the PostgreSQL database successfully!");
    })
    .catch((error:any) => {
      console.error("Error connecting to the database:", error);
      prisma.$disconnect();
      process.on("SIGINT", async () => {
        console.log("Shutting down...");
        await prisma.$disconnect();
      });
      process.exit(1);
    });

};
