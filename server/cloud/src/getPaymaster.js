const axios = require("axios").default;
const ethers = require("ethers");
const { PaymasterAPI, calcPreVerificationGas } = require("@account-abstraction/sdk");
const { toJSON } = require("./opUtils");

const SIG_SIZE = 65;
const DUMMY_PAYMASTER_AND_DATA =
  "0x0101010101010101010101010101010101010101000000000000000000000000000000000000000000000000000001010101010100000000000000000000000000000000000000000000000000000000000000101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101";


class VerifyingPaymasterAPI extends PaymasterAPI {
  constructor(paymasterUrl, entryPoint) {
    super();
    this.paymasterUrl = paymasterUrl;
    this.entryPoint = entryPoint;
  }

  async getPaymasterAndData(userOp) {
    try {
      await ethers.utils.resolveProperties(userOp);
    } catch (_) {}
    const pmOp = {
      sender: userOp.sender,
      nonce: userOp.nonce,
      initCode: userOp.initCode,
      callData: userOp.callData,
      callGasLimit: userOp.callGasLimit,
      verificationGasLimit: userOp.verificationGasLimit,
      maxFeePerGas: userOp.maxFeePerGas,
      maxPriorityFeePerGas: userOp.maxPriorityFeePerGas,
      paymasterAndData: DUMMY_PAYMASTER_AND_DATA,
      signature: ethers.utils.hexlify(Buffer.alloc(SIG_SIZE, 1)),
    };
    const op = await ethers.utils.resolveProperties(pmOp);
    op.preVerificationGas = calcPreVerificationGas(op);
    return axios
      .post(this.paymasterUrl, {
        jsonrpc: "2.0",
        id: 1,
        method: "pm_sponsorUserOperation",
        params: [await toJSON(op), this.entryPoint],
      })
      .then((res) => res.data.result.toString());
  }
}

const getVerifyingPaymaster = (
  paymasterUrl,
  entryPoint
) => new VerifyingPaymasterAPI(paymasterUrl, entryPoint);

module.exports = {
  getVerifyingPaymaster,
};
