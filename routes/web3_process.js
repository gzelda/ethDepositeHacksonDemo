console.log(web3);
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
}
else{
  console.log("inject web3 please");
}
web3.eth.defaultAccount = web3.eth.accounts[0];
console.log(web3.eth.defaultAccount);
var ContractABI = web3.eth.contract([
{
  "constant": false,
  "inputs": [],
  "name": "giveBackDeposit",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "primary_id",
      "type": "uint256"
    }
  ],
  "name": "mortgage",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    },
    {
      "name": "",
      "type": "bool"
    },
    {
      "name": "",
      "type": "address"
    },
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "primary_id",
      "type": "uint256"
    }
  ],
  "name": "set_violation",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "id",
      "type": "uint256"
    }
  ],
  "name": "account_exist",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "dateTimeAddr",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "id",
      "type": "uint256"
    }
  ],
  "name": "get_account_info",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    },
    {
      "name": "",
      "type": "bool"
    },
    {
      "name": "",
      "type": "address"
    },
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "get_balance",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}
]);
//var Coursetro = CoursetroContract.at('0x6e30a30175055116c54a1d47ed47630d05498809');
var Contract = ContractABI.at('0x233e8568850c64c51f5babb9a8ec9ebc035a17ad');
console.log(Contract);

Contract.get_balance((err,res)=>{
  if (!err){
    $("#instructor").html("Contract Balance : " + web3.fromWei(res.toNumber(), "ether" ) +' ether');
    console.log("result:",web3.fromWei(res.toNumber(), "ether" ));
  }else{
    console.log(err);
  }
});

$(function(){
  $("#button").click(function() {
  		console.log("in");
        Contract.mortgage($("#identity").val(),{ value: web3.toWei(0.02)}, 
        	function(err, res){
        		if (!err) alert("transaction success");
        		else alert("transaction falied");
  			});
    });

  $("#query").click(function(){
  		console.log("in query");
  		Contract.account_exist($("#query_identity").val(),function(err, res){
  			if (!err) {
  				console.log(res);
  				if (res)
  					$("#query_result").html("Number " + $("#query_identity").val()+ " has already sent deposit!" );
  				else
  					$("#query_result").html("Number " + $("#query_identity").val()+ " has no record." );

  				
  			}
  			else console.log(err);
  		})
  })
});