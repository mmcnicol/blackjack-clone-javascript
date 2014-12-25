
function cPack() 
{
	this.arrayPlayingCards = [];
}

cPack.prototype.init = function() 
{
	this.createSuit("clubs");
	this.createSuit("diamonds");
	this.createSuit("hearts");
	this.createSuit("spades");

	this.shuffle();
};

cPack.prototype.createSuit = function(_suit) 
{
	this.arrayPlayingCards.push( new cPlayingCard(_suit, 11, "A") );

	for(i=2; i<=9; i++)
	{
		this.arrayPlayingCards.push( new cPlayingCard(_suit, i, i) );
	}

	this.arrayPlayingCards.push( new cPlayingCard(_suit, 10, "J") );
	this.arrayPlayingCards.push( new cPlayingCard(_suit, 10, "Q") );
	this.arrayPlayingCards.push( new cPlayingCard(_suit, 10, "K") );
};

cPack.prototype.getCardsCount = function() 
{
	return this.arrayPlayingCards.length; 
};

cPack.prototype.consolePrint = function() 
{
	for(i=0; i< this.getCardsCount(); i++)
	{
		this.arrayPlayingCards[i].consolePrint();
	}
};

cPack.prototype.shuffle = function() 
{
	// How to randomize (shuffle) a JavaScript array?
	// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

	var currentIndex = this.getCardsCount();
	var temporaryValue;
	var randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) 
	{

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = this.arrayPlayingCards[currentIndex];
		this.arrayPlayingCards[currentIndex] = this.arrayPlayingCards[randomIndex];
		this.arrayPlayingCards[randomIndex] = temporaryValue;
	}

};


cPack.prototype.getNextCard = function() 
{
	if ( this.getCardsCount == 0 )
	{
		this.init();
	}

	nextCard = this.arrayPlayingCards.pop();
	console.log("nextCard is " + nextCard.getDescription() );
	return nextCard;
};
