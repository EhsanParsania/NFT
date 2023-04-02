const ethers = require("ethers"); 


 function toJSON(op) {
  return ethers.utils.resolveProperties(op).then((userOp) =>
    Object.keys(userOp)
      .map((key) => {
        let val = (userOp)[key];
        if (typeof val !== "string" || !val.startsWith("0x")) {
          val = ethers.utils.hexValue(val);
        }
        return [key, val];
      })
      .reduce(
        (set, [k, v]) => ({
          ...set,
          [k]: v,
        }),
        {}
      )
  );
}

 async function printOp(
  op
) {
  return toJSON(op).then((userOp) => JSON.stringify(userOp, null, 2));
}

module.exports = {
  toJSON,
  printOp,
};
