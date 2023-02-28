const Voting = artifacts.require("./Voting.sol");
const { BN , expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

contract("Voting", (accounts) => {

  let votingInstance;

  const _owner = accounts[0];
  const _voter1 = accounts[1];
  const _voter2 = accounts[2];
  const _voter3 = accounts[3];

  beforeEach(async () => {
    votingInstance = await Voting.new({from: _owner});
    await votingInstance.addVoter(_owner, { from: _owner });
  });

  it("should allow adding a voter", async () => {
    await votingInstance.addVoter(_voter1, { from: _owner });
    const voter = await votingInstance.getVoter(_voter1);
    expect(voter.isRegistered).to.be.true;
  });

  it("should not allow adding a voter when voter registration is not open", async () => {
    await expectRevert(votingInstance.addVoter(_voter1, { from: _owner }), "Voters registration is not open yet");
  });

  it("should allow adding a proposal", async () => {
    const proposalDescription = "Proposal 1";
    await votingInstance.startProposalsRegistering({ from: _owner });
    await votingInstance.addProposal(proposalDescription, { from: _voter1 });
    const proposal = await votingInstance.getOneProposal(1);
    expect(proposal.description).to.equal(proposalDescription);
  });

  it("should not allow adding a proposal when proposals registration is not open", async () => {
    const proposalDescription = "Proposal 1";
    await expectRevert(votingInstance.addProposal(proposalDescription, { from: _voter1 }), "Proposals are not allowed yet");
  });

  it("should allow a registered voter to vote", async () => {
    const proposalId = 1;
    await votingInstance.startVotingSession({ from: _owner });
    await votingInstance.addVoter(_voter1, { from: _owner });
    await votingInstance.addProposal("Proposal 1", { from: _voter2 });
    await votingInstance.setVote(proposalId, { from: _voter1 });
    const voter = await votingInstance.getVoter(_voter1);
    expect(voter.hasVoted).to.be.true;
  });

  it("should not allow a registered voter to vote twice", async () => {
    const proposalId = 1;
    await votingInstance.startVotingSession({ from: _owner });
    await votingInstance.addVoter(_voter1, { from: _owner });
    await votingInstance.addProposal("Proposal 1", { from: _voter2 });
    await votingInstance.setVote(proposalId, { from: _voter1 });
    await expectRevert(votingInstance.setVote(proposalId, { from: _voter1 }), "You have already voted");
  });

  it("should tally the votes and update the winning proposal ID", async () => {
    const proposal1 = "Proposal 1";
    const proposal2 = "Proposal 2";
    await votingInstance.startVotingSession({ from: _owner });
    await votingInstance.addVoter(_voter1, { from: _owner });
    await votingInstance.addVoter(_voter2, { from: _owner });
    await votingInstance.addProposal(proposal1, { from: _voter3 });
    await votingInstance.addProposal(proposal2, { from: _voter3 });
    await votingInstance.setVote(1, { from: _voter1 });
    await votingInstance.setVote(2, { from: _voter2 });
    await votingInstance.endVotingSession({ from: _owner });
    const winningProposalId = await votingInstance.winningProposalId();
    expect(winningProposalId).to.be.bignumber.equal(new BN(2));
    });
});
