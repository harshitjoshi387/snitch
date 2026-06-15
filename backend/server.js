import "dotenv/config";
import app from "./backend/src/app.js";
import connectDB from "./backend/src/config/db.js";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
