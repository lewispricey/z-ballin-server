import data from "./data";
import seed from "./seed";

const runSeed = async () => {
  await seed(data);
};

runSeed();
