
function cPlayingCard(_suit, _faceValue, _name)
{
	this.suit = _suit;
	this.faceValue = _faceValue;
	this.name = _name;

	this.suitHtmlEntity;

	switch(this.suit)
	{
		case "clubs":
			this.suitHtmlEntity = "&clubs;";
			break;
		case "diamonds":
			this.suitHtmlEntity = "&diams;";
			break;
		case "hearts":
			this.suitHtmlEntity = "&hearts;";
			break;
		case "spades":
			this.suitHtmlEntity = "&spades;";
			break;
		default:
			this.suitHtmlEntity = "unknown";
	}
}

cPlayingCard.prototype.getDescription = function() 
{
	return this.name + " " + this.suit;
};

cPlayingCard.prototype.consolePrint = function() 
{
	console.log(this.name + " " + this.suit);
};

cPlayingCard.prototype.getFaceValue = function() 
{
	return this.faceValue;
};
