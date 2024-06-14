<script>
    import Button from '../Shared/Button.svelte';
    import {createEventDispatcher} from 'svelte';
    import PollStore from '../Stores/PollStrore';


    let fields = {question:'',answerA:'',answerB:''};
    let errors =  {question:'',answerA:'',answerB:''};
    let valid = false;
    let dispatch = createEventDispatcher();
    const submitHandler = ()=>{
        valid = true;
        // validate question
            if(fields.question.trim().length < 5){
                valid = false;
                errors.question = 'Questions must be at least five characters long'
            }else{
                errors.question = "";
            }
        //validate answer A

            if(fields.answerA.trim().length < 1){
                valid = false;
                errors.answerA = 'Answer A cannot be empty';
            }else{
                errors.answerA = "";
            }

        //validate answer B
            if(fields.answerB.trim().length < 1){
                valid = false;
                errors.answerB = 'Answer B cannot be empty';
            }else{
                errors.answerB = "";
            }
        // add new poll

        if(valid){
            let poll = {...fields,voteA:0,voteB:0,id:Math.random()}
            PollStore.update(current =>{
                return [poll,...current]
            })
            dispatch('add',poll);
            console.log('valid',fields);
        }
    }
</script>

<form on:submit|preventDefault={submitHandler}>
    <div class="form-field">
        <label for="question">Poll Question:</label>
        <input type="text"  id="question" bind:value={fields.question}>
        <div class="error">{errors.question}</div>
    </div>
    <div class="form-field">
        <label for="answer-a">Answer A:</label>
        <input type="text"  id="answer-a"  bind:value={fields.answerA}>
        <div class="error">{errors.answerA}</div>
    </div>
    <div class="form-field">
        <label for="question">Answer b</label>
        <input type="text"  id="answer-b"  bind:value={fields.answerB}>
        <div class="error">{errors.answerB}</div>
    </div>
    <Button type="primary" flat={true} >Add Poll </Button>
</form>

<style>
    form{
        width: 400px;
        margin: 0 auto;
        text-align: center;

    }
    .form-field{
        margin: 18px auto;

    }
    input{
        width: 100%;
        border-radius: 6px;
    }
    label{
        margin: 10px auto;
        text-align: left;
    }
    .error{
        color: red;
        font-weight: bold;
        font-size: 12px;
    }
</style>