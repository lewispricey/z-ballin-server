import db from "../connection";

const dropTables = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS users CASCADE`);
    await db.query(`DROP TABLE IF EXISTS accounts CASCADE`);
    await db.query(`DROP TABLE IF EXISTS categories CASCADE`);
    await db.query(`DROP TABLE IF EXISTS transactions CASCADE`);

    console.log("Dropped Tables  ✅");
  } catch (error) {
    console.log(`
    Error Dropping Tables ❌
    ${error}`);
  }
};

export default dropTables;
