txIn2 = [
  {
    txHash: '9138ffbfeb2a7dc92f0409952fa58bcd47e9cadb7386e08db0e08f6cf3b1bcc4',
    txId: 0,
    value: {
      lovelace: 609217172,
      '91b60c1a536dc8f4c8dfb7c85b1bf066aa9e1b34f19188bbfb6a3a89.marceloBILU': 1
    }
  }
]

txIn = [
  {
    txHash: '60caefe125ffefdcb25e57a4063d9cacecbc5dfe08d97fa5255b94ed42bbc370',
    txId: 0,
    value: { lovelace: 18803934 }
  }
]


console.log(txIn[0].hasOwnProperty('value'));
var lovelace= txIn[0].value.lovelace;
var lovelace3 = {value: {lovelace}};
console.log(lovelace3);

console.log(txIn[0]);
delete txIn[0].value;

Object.assign(txIn[0], lovelace3);


//Object.assign(mintInfo, metadata)
//delete obj.myProperty

console.log(txIn[0]);