import { ConnectionOptions} from "typeorm";

const ConnectionOptions : ConnectionOptions = {
    type: "postgres",
    database: "nuber",
    synchronize: true,
    logging: true,
    entities: [
        "entities/*.*"
    ],
    host: process.env.DB_ENDPOINT || "localhost",
    port: 5433,
    username: process.env.DB_USERNAME || "nowheremirachle",
    password: process.env.DB_PASSWORD || "1234"

};

export default ConnectionOptions;