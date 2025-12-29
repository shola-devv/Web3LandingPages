import { createPublicClient, http } from "viem";
import { WalletClient, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

import fs from "fs";

const abi = JSON.parse(fs.readFileSync("artifacts/Emmanuelcoin.abi.json", "utf-8"));
const bytecode = fs.readFileSync("artifacts/Emmanuelcoin.bin", "utf-8");

const account = privateKeyToAccount("YOUR_PRIVATE_KEY");
const walletClient: WalletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http("https://mainnet.infura.io/v3/YOUR_INFURA_KEY"),
});

async function deploy() {
  const txHash = await walletClient.deployContract({
    abi,
    bytecode,
    // Optional constructor args
    args: [],
  });

  console.log("Deployed tx:", txHash);
}

deploy();
