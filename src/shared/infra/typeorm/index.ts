import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

export default async (host: string = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return await createConnection(
    Object.assign(defaultOptions, {
      host,
      database: process.env.NODE_ENV === 'test' ? "rentx_test" : defaultOptions.database
    })
  );
};