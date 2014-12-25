
function cPlayer(_name, _type, _initialBalanceAmount)
{
	this.name = _name;
	this.type = _type;
	this.balanceAmount = _initialBalanceAmount;
	this.betAmount = 0;
	this.arrayPlayingCards = [];
}


cPlayer.prototype.getBetAmount = function() 
{
	return this.betAmount;
};

cPlayer.prototype.setBetAmount = function(_betAmount) 
{
	this.betAmount = _betAmount;
};

cPlayer.prototype.incrementPlayerBet = function(_betAmount) 
{
	if (this.balanceAmount >= _betAmount)
	{
		this.betAmount = this.betAmount + _betAmount;
		this.balanceAmount = this.balanceAmount - _betAmount;
		console.log("this.betAmount=" + this.betAmount );
	}
	else
	{
		console.log("no money left!");
	}
};


cPlayer.prototype.getBalanceAmount = function() 
{
	return this.balanceAmount;
};

cPlayer.prototype.setBalanceAmount = function(_balanceAmount) 
{
	this.balanceAmount = _balanceAmount;
	//console.log("this.balanceAmount=" + this.betAmount );
};


cPlayer.prototype.getCardsCount = function() 
{
	return this.arrayPlayingCards.length; 
};

cPlayer.prototype.addCard = function(_playingCard) 
{
	//console.log("player addCard() " + _playingCard.getDescription() );
	this.arrayPlayingCards.push( _playingCard );
};

cPlayer.prototype.getCardsTotal = function() 
{
	var total = 0;

	for(i=0; i< this.getCardsCount(); i++)
	{
		total = total + this.arrayPlayingCards[i].getFaceValue();
	}

	return total;
};

cPlayer.prototype.clearCards = function() 
{
	this.arrayPlayingCards = [];
};
