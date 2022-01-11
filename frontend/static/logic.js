const serverUrl = "";
const appId = "";
Moralis.start({ serverUrl, appId }); 

const storeSecretAddress = "";
const storeSecretABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"updatedTimestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"entryGas","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"gasSpent","type":"uint256"}],"name":"NumberUpdated","type":"event"},{"inputs":[],"name":"benchMark","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getSecret","outputs":[{"internalType":"uint256","name":"_secret","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newSecret","type":"uint256"}],"name":"storeSecret","outputs":[],"stateMutability":"nonpayable","type":"function"}];


login();

async function login(){
    Moralis.Web3.enableWeb3().then(async function (){
        const chainIdHex = await Moralis.switchNetwork("0x2A");
    });
}

async function storeSecret() {
    const web3 = await Moralis.enableWeb3();
    const secretNumber = document.getElementById("secretNumber").value;
    const options = {
        contractAddress: storeSecretAddress,
        functionName: "storeSecret",
        abi: storeSecretABI,
        params: {
          _newSecret: secretNumber
        },
      };
    const receipt = await Moralis.executeFunction(options);
    window.alert("operation concluded with hash " + receipt["transactionHash"]);
};


async function estimate() {
    const web3 = await Moralis.enableWeb3();
    const secretNumber = document.getElementById("secretNumber").value;
    const storeContract = await new web3.eth.Contract(storeSecretABI,storeSecretAddress)
    const estimatedGas = await storeContract.methods.storeSecret(secretNumber).estimateGas({from:ethereum.selectedAddress})
    document.getElementById("estimatedGas").value = estimatedGas;
}

