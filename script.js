const selectionButtons=document.querySelectorAll(`[data-selection]`);
const finalColumn=document.querySelector(`[data-last-column]`);
const yourScoreSpan=document.querySelector(`[data-your-score]`);
const computerScoreSpan=document.querySelector(`[data-computer-score]`);

const SELECTIONS=[
  {
    name:`rock`,
    emoji:`✊`,
    beats:`scissor`
  },
  {
    name:`paper`,
    emoji:`✋`,
    beats:`rock`
  },
  {
    name:`scissor`,
    emoji:`✌️`,
    beats:`paper`
  }
]

selectionButtons.forEach(selectionButton =>{
  selectionButton.addEventListener(`click`,e =>{
    const selectionName =selectionButton.dataset.selection
    const selection=SELECTIONS.find(selection => selection.name===selectionName);
        makeSelection(selection);
  })
})

function makeSelection(selection){
  const computerSelection = randomSelection();
  const yourwinner=isWinner(selection,computerSelection);
  const computersWinner=isWinner(computerSelection,selection);
  
  addSelectionResult(computerSelection,computersWinner)
  addSelectionResult(selection,yourwinner);

  if(yourwinner){
    increment(yourScoreSpan);

  }
 if(computersWinner){
  increment(computerScoreSpan);
 } 
}

function increment(scoreAdder){
  scoreAdder.innerText= parseInt(scoreAdder.innerText)+1;
}

function addSelectionResult(selection,winner){
  const div=document.createElement(`div`);
  div.innerText=selection.emoji;
  div.classList.add(`result-selection`);
  if(winner) {div.classList.add(`winner`)}
  finalColumn.after(div);
}

function isWinner(selection,opponentSelection){
  return selection.beats === opponentSelection.name;
}

function randomSelection(){
  const randomIndex=Math.floor(Math.random()*SELECTIONS.length);
  return SELECTIONS[randomIndex];
}