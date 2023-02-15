import { createServer } from 'http';
import app from './app';
import { connectDb } from './database';

require('dotenv-safe').config();

async () => {
  try {
    await connectDb();
  } catch (error) {
    process.exit(1);
  }
};

const server = createServer(app.callback());

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
