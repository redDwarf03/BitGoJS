import * as utxolib from '@bitgo/utxo-lib';

const successfulParentTxHex = '010000000001019cc0e63e8e037873d309f0f75b374202cd3bb228354f443f2751589016f9551f00000000232200209e70056b49ced4964c2abd091907a21bb2a6dd75f372460b009ec3b5e96f2730ffffffff02d4e79d000000000017a914f9a7950e9666348ae37826d83bfe96cd2e15312f87102700000000000017a914d682476e9bd54454a885f9dff1e604e99cef43dc8704004730440220647338bf8501a92f3b70e766806a29c0320afbd679bf1a72167908e45f592a80022079726e7e6c6a54e74c788025065a97cfc5d03cf780f082f5db4894928cc3567f0147304402200eef494043c0fced8370f7aaaa9d7328d439f9bda694ba6205f7b1e24c0de17002205b9078530524f27eb0c59fd4aafb8efa73646c90f8c9021e7a056531477624d00169522103abfd364d46f23e5ad8a166d2e42dda06014c86661a11e00947d1ed3f29277a2d2103cb22468f629363aba24e080a79828a660970c307977a51be1146ba2abe611fe921030cbcfec6a39f063a38332b60f0a29da571e02aa6624752f7dd031699d8f44fc653ae00000000';
const parentTxHex = '01000000000102e1c30f2a424bd339eada830a78286a5606c99d7f8e2e8be1955858d84d375f75000000002322002046d27566b5fa5bc2375cb43c86bfb46c9856c0a0b1bf99f8ec8f89fa6b13ca89ffffffff7c2d3cc1c05db074350595d47f719b5cef0a0fb549ba95b9b9f9cb1056d01cbf0000000023220020a05257bbe2d6db470ea8c367d7b948dff19e99d8d775ab09ee4973db478c8fddffffffff01404397000000000017a91488990f2994b2f11965e9542e0d01da61d9c019cf870400473044022046b0244399c0a56c8a0fdff3f150c520d24961a3de040e61f5b1ba90885710060220557e02802fac7086366cc4a477909372d4057188aaae8496f58d71e66d56869e014730440220161a729f4f9c59aa5ec86007701c8f0ea0c679da46c971c46739abd6ec0c20ef02205b849490fe98811617eeb06d99c7f9ad8b6c69b0c325f2f1e7a43212ab38b63601695221025b864106f997d8a6b2cb38ae96f8e16c64bc62ad2cc1b168fd34f3ba194538ee2102670baf6f5297999203c08c0e0ec24d7367f6b3d4cf7d593dda4a767d1e2c9ddd210371d5623a5e5ee232842631889adf2b7a6cf9a04ea8ad2488726b3f056ddd202053ae0400483045022100838fb910810bccaca63901b4ebec208442553b51df9a87ba0ffde2323730c09502201e567a3741ef3ed8eb4f3f69ef675f5623b631e464e0af9ca3eaf395eb7c52bf01483045022100bcb17e5cda35b70015184c2e795a05ff37b40bf573a1fb855b25117e32a85b1502204296cfbea889847f9fbfd062397a2c6b04f6aa1874326539905ae5c6d49080600169522102befcec96c8f9c785886b90d0b32d1f0b3f400c984221e575a24b69500ee77a5921037b35acc45dffa07bf2b39028797da52c69aefb56f92d2b2fcaaf9ba51c84bae921023fdfd3e337cf97fbe7872a9c6f9d992ca25369c4b0a978dd266d4727e0a2196c53ae00000000';
const accelerateParentTxHex = '01000000025f4acdcb5efe0b5800b8dda3ee8c37c322a9e4e2a92943bcd60f677cfb57fa2700000000fdfe0000483045022100fd5dcf7df6207a33e74c4846e2ba32b0759e7aaeac1cb7ce19d3ce01e209682302203340830e46b6f005f138b359118afa8f1ac5272860480c1e21d7b986011f151201483045022100ba9edc93c3aedeb2c82f1698f14d28cce4f61e193a9b9085739c78edc6b53b95022015e39c5b0453873fdc2cbd15f360da9d6be61fcd7e66be6e691d23f5c8e20ecc014c69522102cd3c8e6006a4627705021d1d016d097c2944d98100a47bf2da67a5fe15aeeb342102ee1fa9e812e779356aa3c31ebf317d0cffebab92864cfe38bab223e0820f98bc21026ba05752baa6eafd5c5659da62b7f0ac51fd2886b65c241d0afef1c4fdfa1cbc53aeffffffffb8d7c3fe34a2a53033ec84e31880b9e47e4b70ff25c75ac42438d3a9b39da19201000000fc004730440220418e7695f5fb6b8b29e8bdd174e8a0379a6dc2af64554055eae751904fed78eb0220430bf2a2593b8b4c4442a9c4a949ce746ed4999dbbd272a3dc4d7572e1e27154014730440220227079fc5811fd6501046c255766afd3448676e98ec72fcc559dbf9986081ac302200a844b3187f0ff2a2a0fae3b258421eb057aeb8152702f6d6136dcb4818203c1014c69522102cd3c8e6006a4627705021d1d016d097c2944d98100a47bf2da67a5fe15aeeb342102ee1fa9e812e779356aa3c31ebf317d0cffebab92864cfe38bab223e0820f98bc21026ba05752baa6eafd5c5659da62b7f0ac51fd2886b65c241d0afef1c4fdfa1cbc53aeffffffff02102700000000000017a914d682476e9bd54454a885f9dff1e604e99cef43dc87d82100000000000017a914afa36ee1e58397ab03059e53346b64c920ac0f0e8700000000';
const ignoreMaxFeeRateTxHex = '010000000001019cc0e63e8e037873d309f0f75b374202cd3bb228354f443f2751589016f9551f00000000232200209e70056b49ced4964c2abd091907a21bb2a6dd75f372460b009ec3b5e96f2730ffffffff02d4e79d000000000017a914f9a7950e9666348ae37826d83bfe96cd2e15312f87102700000000000017a914d682476e9bd54454a885f9dff1e604e99cef43dc8704004730440220647338bf8501a92f3b70e766806a29c0320afbd679bf1a72167908e45f592a80022079726e7e6c6a54e74c788025065a97cfc5d03cf780f082f5db4894928cc3567f0147304402200eef494043c0fced8370f7aaaa9d7328d439f9bda694ba6205f7b1e24c0de17002205b9078530524f27eb0c59fd4aafb8efa73646c90f8c9021e7a056531477624d00169522103abfd364d46f23e5ad8a166d2e42dda06014c86661a11e00947d1ed3f29277a2d2103cb22468f629363aba24e080a79828a660970c307977a51be1146ba2abe611fe921030cbcfec6a39f063a38332b60f0a29da571e02aa6624752f7dd031699d8f44fc653ae00000000';
const unrelatedTxHex = '01000000000101d1c40822841db824893f4038660019ca443e00b83ed1f016b673d33e043a628801000000232200201b646106e3bd0e7541a2135376a6ee9362715c2f4ea74e2ea28d1de990021834ffffffff028eeb25020000000017a914b634d2464a22e99daa3822432d4903e55ae6482b87102700000000000017a914d682476e9bd54454a885f9dff1e604e99cef43dc870400483045022100c8c3ec442bfcddbc58da45c61252bfa2a50e0b2c91124fa3c5b0667eb8b785c002205e370a583d10a2d19785ae6b256638cb267b18478b5fc3de3d928f1c50e50bd401483045022100d7bd1ec22e2e5d0aa4e31f24d73d1fdefcc1c6caa85af17252a48021ca20b81002201ffa870ffa9d16ce9cd8c72e17bfb7f6698cef293afcc5b45b039114e9b64b200169522103bf0667e3b22adabdba9b05dc48cc5a5fc5c44b7dcbe7855284dee82333eea8b2210399c2e5dcadad8e980c58ea6099ea7a39b4b710576a3a03e65efaa71ff42de6bd21033b883beaa9c7eb0f69a6b3e53b0b267707b256e8764cd33bed87d181a43a272d53ae00000000';

const { createTransactionFromHex } = utxolib.bitgo;
const network = utxolib.networks.bitcoin;

export const fixtures: { [txId: string]: string; } = {
  [createTransactionFromHex(parentTxHex, network).getId()]: parentTxHex,
  [createTransactionFromHex(successfulParentTxHex, network).getId()]: successfulParentTxHex,
  [createTransactionFromHex(accelerateParentTxHex, network).getId()]: accelerateParentTxHex,
  [createTransactionFromHex(ignoreMaxFeeRateTxHex, network).getId()]: ignoreMaxFeeRateTxHex,
  [createTransactionFromHex(unrelatedTxHex, network).getId()]: unrelatedTxHex,
};
