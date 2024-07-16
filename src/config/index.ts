import "dotenv/config";

const config = {
  isDevelopment: process.env.NODE_ENV === "development",
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  server_url: process.env.SERVER_URL,
  jwt_secret: process.env.JWT_SECRET,
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
  },
};

export default config;
