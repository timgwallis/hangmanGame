$(document).ready(function() {
	var wins = 0;
	var guessCount = 12;
	var currentWordIndex = 0;
	var currentWord = "";
	var currentFiller = "";
	var lettersAlreadyGuessed = [];
	var numberOfGuesses = 12;

	var currentBGImagePath;
	var bgImageIndex = 0;

	var words = [ "SCRUM MASTER",
				"PRODUCT OWNER",
				"PROJECT MANAGER",
				"ECONOMICS",
				"HOLACRACY",
				"AGILE",
				"SCRUM",
				"KANBAN",
				"SCALED AGILE",
				"SCRUM OF SCRUM",
				"NEXUS"];



	var bGImagePaths = [""];


	function startGame(){
		wins = 0;
		currentWordIndex = 0;
		setBackgroundImage();
		setGameValuesByIndex();
		displayFiller();
		displayNumberOfGuesses();
		displayWins();
	}




	function newGame(){
		assignIndexForNextWord();
		setBackgroundImage();
		numberOfGuesses = 12;
		lettersAlreadyGuessed = [];
		$("#lettersAlreadyGuessed").html("");
		setGameValuesByIndex();
		displayFiller();
		displayNumberOfGuesses();
		displayWins();
	}

	function assignIndexForNextWord(){
		currentWordIndex++;
		if(currentWordIndex > words.length){
			 currentWordIndex = 0;
		}
	}

	function setBackgroundImage(){
		var nextImageLink = bGImagePaths[currentWordIndex]
		console.log("Image LinkL:" + nextImageLink);
		  document.body.style.backgroundImage = "url('" + nextImageLink + "')";
	}

	function setGameValuesByIndex(){
		currentWord = words[currentWordIndex];
		compileCurrentFiller();
	}

	function compileCurrentFiller(){
		let currentCharacter;
		currentFiller = "";
		for(i=0; i < currentWord.length;i++){
			currentCharacter = currentWord.charAt(i);
			if(isALetter(currentCharacter)){
				currentFiller += "_";
			}else{
				currentFiller += currentCharacter;
			}
		}
	}

	function isALetter(input){
		return input.length === 1 && input.match(/[a-z]/i);
	}

	function doesFillerStillHaveUnfoundLetters(){
		if(currentFiller.indexOf('_') === -1){
			return false;
		}
		else{
			return true;
		}
	}

	function hasAlreadyUsedLetter(key){
		return lettersAlreadyGuessed.indexOf(key) != -1;
	}

	function isLetterInWord(key){
		return currentWord.indexOf(key) != -1;
	}

	function addLetterToListOfAlreadyUsed(key){
		lettersAlreadyGuessed.push(key);
		displayLettersAlreadyGuessed();
	}

	function displayLettersAlreadyGuessed(){

		if(lettersAlreadyGuessed.length > 0){

			let displayString = lettersAlreadyGuessed[0];

			for(i=1;i<lettersAlreadyGuessed.length;i++){
				displayString += ", " + lettersAlreadyGuessed[i];
			}

			$("#lettersAlreadyGuessed").html(displayString);
		}
	}

	function displayFiller(){
		$("#filler").html(currentFiller);
	}

	function displayWins(){
		$("#wins").html("Wins: " + wins);
	}

	function displayNumberOfGuesses(){
		$("#numberOfGuesses").html(numberOfGuesses);
	}

	function updateFillerWithLetter(letter){
		var index = 0;
		while(currentWord.indexOf(letter) != -1){
			index = currentWord.indexOf(letter);
			currentWord = currentWord.substr(0,index) + "_" + currentWord.substr(index + 1);
			currentFiller = currentFiller.substr(0,index) + letter + currentFiller.substr(index + 1);
		}
		displayFiller();
	}



	$(document).ready(startGame());

	document.onkeyup = function(event){
		let key = event.key.toLowerCase();
		if(isALetter(key)){
			if(!hasAlreadyUsedLetter(key)){
				addLetterToListOfAlreadyUsed(key);
				displayLettersAlreadyGuessed();

				if(isLetterInWord(key.toUpperCase())){
					updateFillerWithLetter(key.toUpperCase());

					if(!doesFillerStillHaveUnfoundLetters()){
						wins++;
						playSound("assets/sounds/win.wav")
						setTimeout(function(){newGame();},2000);
					}else{
						playSound("assets/sounds/correct.wav")
					}

				}else{
					numberOfGuesses--;
					displayNumberOfGuesses();
					if(numberOfGuesses == 0){
						playSound("assets/sounds/lose.wav")
						setTimeout(function(){newGame();},2000);
					}else{
						playSound("assets/sounds/incorrect.wav")
					}
				}

			}
		}
	}

	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var player;
	function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: 'M7lc1UVf-VE',
		events: {
		'onReady': onPlayerReady,
		'onStateChange': onPlayerStateChange
		}
	});
	}

	function onPlayerReady(event) {
	event.target.playVideo();
	}

	var done = false;
	function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(stopVideo, 6000);
		done = true;
	}
	}
	function stopVideo() {
	player.stopVideo();
		  }


	function playSound(soundlocation){
		var audio = new Audio(soundlocation);
		audio.play();
	}

});
