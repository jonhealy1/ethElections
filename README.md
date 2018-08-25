# ethElections

Sources: https://truffleframework.com/tutorials/pet-shop /and/ http://www.dappuniversity.com/

Rinkeby Network: 0x81D2F01fd7d59Aa5675283A5e52446A773134a0E

Prequisites: 

1. Install Truffle: npm install -g truffle
2. Install Ganache: npm install -g ganache-cli
3. Install MetaMask: https://metamask.io/
3. Download this project
4. Navigate to project folder with terminal
5. Install project dependencies: npm install
6. Compile: truffle compile
7. Open MetaMask in Brave or Google Chrome
8. Go to network: localhost:8545 in MetaMask (this can be changed in settings if it shows 7545 or something else)
9. Start Ganache: ganache-cli
10. Copy Mnemonic shown in ganache: ex. spawn general accident claim pattern immune muscle lube magnet almost display artist
11. In MetaMask select "restore from seed phrase" 
12. Paste in the Mnemonic from Ganache and create a password
13. In a new terminal window: truffle migrate --reset
14. Open up a browser window with this project running: npm run dev

- Once you choose to either vote or add a candidate you will have to go to MetaMask and submit the transaction. 
- Sometimes the results don't immediately show and the page will need to be refreshed.
- At one point this contract had a lot more functionality but because I have almost zero ability with JavaScript I was not able to include these things:
  1. I wanted to give Users the option to vote on issues as well as candidates.
  2. Adding an issue or candidate was supposed to cost Ether above the transaction fees.
  3. I wanted to have Voters answer general knowledge questions about either the candidates or the issues in order to be delegated votes.

Testing: While this project is running type: truffle test





