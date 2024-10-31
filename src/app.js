import './utilis/global.js';

import 'dotenv/config.js';
import cors from 'cors';

const servidor = express();
servidor.use(cors());
servidor.use(express.json());


const PORT = process.env.PORT;
servidor.listen(PORT, () => console.log(`--> API subiu na porta ${PORT}`));