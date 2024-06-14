<script>
  import Card from "./Card.svelte";
  import PollStore from "../Stores/PollStrore";
  import Button from "../Shared/Button.svelte";
  import {tweened} from 'svelte/motion';

  
  export let poll;

  // reactive value
  $: totalVotes = poll.voteA + poll.voteB;
  $: percentA = Math.floor((100 / totalVotes) * poll.voteA) || 0;
  $: percentB = Math.floor((100 / totalVotes) * poll.voteB) || 0;

  const tweenedA = tweened(0);
  const tweenedB = tweened(0);

  $: tweenedA.set(percentA)
  $:tweenedB.set(percentB)


  const handleVote = (option, id) => {
    PollStore.update((current) => {
      let copiedPolls = [...current];
      let upvoted = copiedPolls.find((poll) => poll.id == id);
      if (option === "a") {
        upvoted.voteA++;
      }
      if (option === "b") {
        upvoted.voteB++;
      }
      return copiedPolls;
    });
  };
  const handleDelete = (id) => {
    PollStore.update((current) => {
      return current.filter((poll) => poll.id != id);
    });
  };
</script>

<Card>
  <div class="poll">
    <h3>{poll.question}</h3>
    <p>Total votes: {totalVotes}</p>
    <div class="answer" on:click={() => handleVote("a", poll.id)}>
      <div class="percent percent-a" style="width:{$tweenedA}%">
        <span>{poll.answerA} ({poll.voteA})</span>
      </div>
    </div>
    <div class="answer" on:click={() => handleVote("b", poll.id)}>
      <div class="percent percent-b" style="width:{$tweenedB}%">
        <span>{poll.answerB} ({poll.voteB})</span>
      </div>
    </div>
  </div>
  <div class="delte">
    <Button flat={true} on:click={() => handleDelete(poll.id)}>Delete</Button>
  </div>
</Card>

<style>
  h3 {
    margin: 0 auto;
    color: #555;
  }
  p {
    margin-top: 6px;
    font-size: 12px;
    color: #999999;
    margin-bottom: 30px;
  }
  .answer {
    background: #f0f0f0;
    cursor: pointer;
    margin: 10px auto;
    position: relative;
  }
  .answer:hover {
    opacity: 0.6;
  }
  span {
    display: inline-block;
    padding: 10px 15px;
    text-wrap: nowrap;
  }
  .percent {
    height: 100%;
    position: relative;
    box-sizing: border-box;
  }
  .percent-a {
    border-left: 4px solid rgba(255, 19, 19);
    background-color: rgba(255, 19, 19, 0.2);
  }
  .percent-b {
    border-left: 4px solid rgba(0, 233, 54);
    background-color: rgba(0, 233, 54, 0.2);
  }
  .delte {
    margin-top: 30px;
    text-align: center;
  }
</style>
