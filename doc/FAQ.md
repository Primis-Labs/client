## Q1: How are private keys and passwords stored?

Primis uses the **polkadot/ui-keyring wrapper** recommended by the official Polkadot website for account management. In that it's a closed loop, so Primis won’t open private keys and passwords to the public.

Primis Web3 Desktop will never store the password information for accounts set by the users, and users should keep the secret phrase, password, and keyfile by themselves.


## Q2: What are the services in the api folder? 


API Folder includes polkadot account management, transfer transactions, NFT retrieval, NFT transactions, etc.
The core functions and descriptions are as follows
- mnemonicGenerate {Create an account and Generate secrect phrase}
- seedCreateAddress {Create an account and save it to keyring}
- accountsChangePassword {Change the account password}
- accountsExport {To export accounts}
- jsonRestore {To import accounts}
- balance {Balance inquiry}
- transfer {Transfer assets}
- nftByAddress {NFT search}
- transferNFT {NFT transactions}


## Q3: What are the services in the store folder? 

Store Folder is mainly to store users' transfering transactions, NFT transaction records, users’ customized avatar settings,etc.
transfer_service Transaction store tool class
- add {Add transaction records}
- getTransfers {Retrieve users' transaction records by address}
- getById {Query transaction records by record id}
- remove {Remove transaction records }

 user_service Store users’ customized avatar settings
- add {Add user address and avatar url info}
- getUser {Retrieve user avatar information by address}
- remove {Remove info}
- updateByAddress {Modify user information by address}



