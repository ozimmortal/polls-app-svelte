import {writable} from 'svelte/store';


const PollStore = writable([
    {
		id:1,
		question:'Python or Javascript',
		answerA:'Python',
		answerB:'Javascript',
		voteA:9,
		voteB:15,
	},
])

export default PollStore;