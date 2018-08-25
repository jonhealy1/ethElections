module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      from: "0xC609cfFE3FE3C6C4E4D8872eF6458c09e2776900",
      network_id: 4,
      gas: 6712390
    }
  }
};
