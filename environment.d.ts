declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production",
            DB_HOST: "localhost" | string,
            DB_PORT: 27017 | number,
            DB_NAME: string,
            APP_PORT: string,
            APP_SECRET_KEY: string
        }
    }
}

export {};