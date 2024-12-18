import app from "./app";
import prisma from "./config/db";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    await prisma.$connect();
    console.log("Database connection established");
  } catch (error) {
    console.error(`Database connection failed: ${error}`);
  }
});