//import { default as Web3} from 'web3';
//import { default as contract } from 'truffle-contract'

App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,
  hasVotedI: false,

  init: function() {
    return App.initWeb3();
  },

  

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
      }).then(function(candidatesCount) {
      
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      var candidatesSelect2 = $('#candidatesSelect2');
      candidatesSelect2.empty();

      var candidatesSelect3 = $('#candidatesSelect3');
      candidatesSelect3.empty();

      var candidatesSelectI = $('#candidatesSelectI');
      candidatesSelectI.empty();

      var candidatesAdd = $('#candidatesAdd');
      candidatesAdd.empty();

      



      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);
         // issuesResults.append(candidateTemplate);
          // Render candidate ballot option
          var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
         // issuesSelect.append(candidateOption);


          candidatesSelect.append(candidateOption);
          candidatesSelect2.append(candidateOption);
          candidatesSelect3.append(candidateOption);
          candidatesSelectI.append(candidateOption);
        });

        
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
      if(hasVoted) {
        $('#candidatesSelect').hide();
        $('#vote1').hide();
      }
      loader.hide();
      content.show();
      return electionInstance.issuesCount();
    }).catch(function(error) {
      console.warn(error);
    });

     // Load contract data 2
     App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.voters2(App.account);
    }).then(function(hasVoted2) {
      // Do not allow a user to vote
      if(hasVoted2) {
        $('#candidatesSelect2').hide();
        $('#vote2').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
    
    // Load contract data 3
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.voters3(App.account);
    }).then(function(hasVoted3) {
      // Do not allow a user to vote
      if(hasVoted3) {
        $('#candidatesSelect3').hide();
        $('#vote3').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote: function() {
    var candidateId = $('#candidatesSelect').val();
    //var candidateId2 = $('#candidatesSelect2').val();
    //var candidateId3 = $('#candidatesSelect3').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote2: function() {
    var candidateId = $('#candidatesSelect2').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote2(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote3: function() {
    var candidateId = $('#candidatesSelect3').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote3(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  addCandidate: function() {
    var candidateId = $('#candidatesAdd').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.addCandidate(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});