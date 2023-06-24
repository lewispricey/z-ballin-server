import createTables from "./create-tables";
import { DataTypes } from "./data/Types";
import dropTables from "./drop-tables";
import insertData from "./insert-data";

const seed = async (data: DataTypes) => {
  await dropTables();
  await createTables();
  await insertData(data);
};

export default seed;
