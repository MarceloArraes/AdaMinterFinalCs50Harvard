txOutList= [
  {
    txHash: '9138ffbfeb2a7dc92f0409952fa58bcd47e9cadb7386e08db0e08f6cf3b1bcc4',
    txId: 0,
    value: {
      lovelace: 609217172,
      '91b60c1a536dc8f4c8dfb7c85b1bf066aa9e1b34f19188bbfb6a3a89.marceloBILU': 1
    }
  }
]

txOutList2 = [
  {
    txHash: '60caefe125ffefdcb25e57a4063d9cacecbc5dfe08d97fa5255b94ed42bbc370',
    txId: 0,
    value: { lovelace: 18803934 }
  }
]



  let result = "";
  txOutList.forEach((txOut) => {
    result += `--tx-out "${txOut.address}+${txOut.value.lovelace}`;
    Object.keys(txOut.value).forEach((asset) => {
      if (asset == "lovelace")
        return;
      result += `+${txOut.value[asset]} ${asset}`;
    });
    result += `" `;
    txOut.datumHash && (result += `--tx-out-datum-hash ${txOut.datumHash}`);
  });

  console.log(result);
