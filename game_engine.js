
function cGameEngine()
{
	this.arrayPlayers = [];
	//this.setState("waitingForButtonDeal");
	this.state = "newGame-waitingForBetToBePlaced";

	this.oPack = new cPack();

	this.oAI = new cAI();

	this.oDisplayManager = new cDisplayManager();
}

cGameEngine.prototype.init = function() 
{
	// 0
	this.arrayPlayers.push( new cPlayer("player1", "human", 3000) );

	// 1
	this.arrayPlayers.push( new cPlayer("AI", "dealer", 0) );

	this.oPack.init();

	//var count = oPack.getCardsCount();
	//console.log( "oPack.getCardsCount()=" + count );
	//oPack.consolePrint();

	this.oDisplayManager.init();

	this.oDisplayManager.addBetButton(1, this.arrayPlayers[0], this);
	this.oDisplayManager.addBetButton(10, this.arrayPlayers[0], this);
	this.oDisplayManager.addBetButton(100, this.arrayPlayers[0], this);
	this.oDisplayManager.addBetButton(500, this.arrayPlayers[0], this);

	playerBalanceAmount = this.arrayPlayers[0].getBalanceAmount();
	this.oDisplayManager.showPlayerBalanceAmount( playerBalanceAmount );
	this.oDisplayManager.showPlayerBetAmount( 0 );

	this.oDisplayManager.showGuidanceMessage("place your bets");
};

cGameEngine.prototype.newGame = function() 
{
	// human
	this.arrayPlayers[0].clearCards();

	// dealer
	this.arrayPlayers[1].clearCards();


	//this.oPack = new cPack();
	//this.oPack.init();

	//this.setState("waitingForButtonDeal");
	this.setState("newGame-waitingForBetToBePlaced");
	
	this.updatePlayerActionButtons();

	playerBalanceAmount = this.arrayPlayers[0].getBalanceAmount();
	if ( playerBalanceAmount > 0 )
	{
		$( "#1" ).prop('disabled', false);
		$( "#10" ).prop('disabled', false);
		$( "#100" ).prop('disabled', false);
		$( "#500" ).prop('disabled', false);

		this.oDisplayManager.showGuidanceMessage("place your bets");
	}
	else
	{
		this.oDisplayManager.showGuidanceMessage("you have no money left!");

		this.setState("cannot-start-new-game--no-money");

		this.updatePlayerActionButtons();
	}
};

cGameEngine.prototype.getState = function() 
{
	return this.state;
};

cGameEngine.prototype.setState = function(_state) 
{
	console.log("cGameEngine.setState: " + _state);
	this.state = _state;
};

cGameEngine.prototype.updatePlayerActionButtons = function() 
{
	playerBetAmount = this.arrayPlayers[0].getBetAmount();
	//console.log("cGameEngine.prototype.updatePlayerActionButtons() playerBetAmount=" + playerBetAmount);

	playerBalanceAmount = this.arrayPlayers[0].getBalanceAmount();
	//console.log("cGameEngine.prototype.updatePlayerActionButtons() playerBalanceAmount=" + playerBalanceAmount);

	if ( this.getState() == "newGame-waitingForBetToBePlaced" && playerBetAmount > 0 )
	{
		//this.setState("waitingForButtonDeal");

		this.oDisplayManager.refreshPlayerActionButtons( this );

		this.oDisplayManager.showPlayerBetAmount( playerBetAmount );
		this.oDisplayManager.showPlayerBalanceAmount( playerBalanceAmount );
	}
	else if ( this.getState() == "newGame-waitingForBetToBePlaced" )
	{
		this.oDisplayManager.refreshPlayerActionButtons( this );

		this.oDisplayManager.showPlayerBetAmount( playerBetAmount );
		this.oDisplayManager.showPlayerBalanceAmount( playerBalanceAmount );

		//this.oDisplayManager.showPlayerCardsTotal("");
		//this.oDisplayManager.showDealerCardsTotal("");
		this.oDisplayManager.clearDealerAndPlayerCards();
	}
	else if ( this.getState() == "cannot-start-new-game--no-money" )
	{
		this.oDisplayManager.refreshPlayerActionButtons( this );
	}
	else if ( this.getState() == "winner-player" )
	{
		this.oDisplayManager.refreshPlayerActionButtons( this );

		this.oDisplayManager.showPlayerBetAmount( playerBetAmount );
		this.oDisplayManager.showPlayerBalanceAmount( playerBalanceAmount );
	}
	else if ( this.getState() == "winner-dealer" )
	{
		this.oDisplayManager.refreshPlayerActionButtons( this );

		this.oDisplayManager.showPlayerBetAmount( playerBetAmount );
		this.oDisplayManager.showPlayerBalanceAmount( playerBalanceAmount );
	}
	else if ( this.getState() == "end-game-draw" )
	{
		this.oDisplayManager.refreshPlayerActionButtons( this );

		this.oDisplayManager.showPlayerBetAmount( playerBetAmount );
		this.oDisplayManager.showPlayerBalanceAmount( playerBalanceAmount );
	}

};

cGameEngine.prototype.incrementPlayerBet = function(_name) 
{
	playerBalanceAmount = this.arrayPlayers[0].getBalanceAmount();
	if ( playerBalanceAmount > 0 )
	{
		switch(_name)
		{
			case 1:
				this.arrayPlayers[0].incrementPlayerBet(_name);
				break;
			case 10:
				this.arrayPlayers[0].incrementPlayerBet(_name);
				break;
			case 100:
				this.arrayPlayers[0].incrementPlayerBet(_name);
				break;
			case 500:
				this.arrayPlayers[0].incrementPlayerBet(_name);
				break;
		}

		this.oDisplayManager.showGuidanceMessage("");
	}
	else
	{
		$( "#1" ).prop('disabled', true);
		$( "#10" ).prop('disabled', true);
		$( "#100" ).prop('disabled', true);
		$( "#500" ).prop('disabled', true);

		this.oDisplayManager.showGuidanceMessage("you have no money left!");
	}
};

cGameEngine.prototype.deal = function() 
{
	this.oDisplayManager.showGuidanceMessage("");

	this.setState("dealing-initial-begin");
	this.oDisplayManager.refreshPlayerActionButtons( this );

	$( "#1" ).prop('disabled', true);
	$( "#10" ).prop('disabled', true);
	$( "#100" ).prop('disabled', true);
	$( "#500" ).prop('disabled', true);

	this.dealerHit(true);

	this.playerHit();

	this.dealerHit(false); // "false" here means next dealer card is not shown (total displayed is not updated)

	this.playerHit();
	this.checkForWinnerOrLooser();

	if ( this.getState() == "dealing-initial-begin" )
	{
		this.setState("waitForButtonHitStand");
		this.oDisplayManager.refreshPlayerActionButtons( this );
	}
};

cGameEngine.prototype.checkForWinnerOrLooser = function() 
{
	console.log("checkForWinnerOrLooser... (state=" + this.getState() + ")" );

	playerTotal = this.arrayPlayers[0].getCardsTotal();
	dealerTotal = this.arrayPlayers[1].getCardsTotal();

	switch( this.getState() )
	{
		case "dealing-initial-begin":
		case "waitForButtonHitStand":
			
			if (playerTotal == 21)
			{
				this.oDisplayManager.showGuidanceMessage("Congratulations, you won!");
				console.log( this.getState() + " playerTotal is == 21");
				this.setState("winner-player");
				this.updatePlayerBalanceEndOfGame();

				this.updatePlayerActionButtons();
			}
			else if (playerTotal > 21)
			{
				console.log( this.getState() + " playerTotal is > 21");
				this.setState("winner-dealer");
				this.oDisplayManager.showGuidanceMessage("Unlucky!");
				this.updatePlayerBalanceEndOfGame();

				this.updatePlayerActionButtons();
			}
			break;

		case "dealerDecideWhetherToHitOrStand":
			if (dealerTotal > 21)
			{
				console.log( this.getState() + " dealerTotal is > 21");
				this.setState("winner-player");
				this.oDisplayManager.showGuidanceMessage("Congratulations, you won!");
				this.updatePlayerBalanceEndOfGame();

				this.updatePlayerActionButtons();
			}
			else if(dealerTotal > playerTotal)
			{
				console.log( this.getState() + " dealerTotal is > playerTotal  ("+dealerTotal+" > "+playerTotal+")");
				this.setState("winner-dealer");
				this.oDisplayManager.showGuidanceMessage("Unlucky!");
				this.updatePlayerBalanceEndOfGame();

				this.updatePlayerActionButtons();
			}
			else if(dealerTotal == playerTotal)
			{
				console.log( this.getState() + " dealerTotal is == playerTotal  ("+dealerTotal+" == "+playerTotal+")");
				this.setState("end-game-draw");
				this.oDisplayManager.showGuidanceMessage("Draw!");
				this.updatePlayerBalanceEndOfGame();

				this.updatePlayerActionButtons();
			}
			break;
	}
};

cGameEngine.prototype.updatePlayerBalanceEndOfGame = function() 
{
	switch( this.getState() )
	{
		case "winner-player":
			playerBetAmount = this.arrayPlayers[0].getBetAmount();
			playerBalanceAmount = this.arrayPlayers[0].getBalanceAmount();
			this.arrayPlayers[0].setBalanceAmount(playerBalanceAmount + (playerBetAmount * 2) );
			break;

		case "winner-dealer":
			//playerBetAmount = this.arrayPlayers[0].getBetAmount();
			//playerBalanceAmount = this.arrayPlayers[0].getBalanceAmount();
			//this.arrayPlayers[0].setBalanceAmount(playerBalanceAmount - playerBetAmount);
			break;

		case "end-game-draw":
			playerBetAmount = this.arrayPlayers[0].getBetAmount();
			playerBalanceAmount = this.arrayPlayers[0].getBalanceAmount();
			this.arrayPlayers[0].setBalanceAmount(playerBalanceAmount + playerBetAmount);
			break;
	}

	this.arrayPlayers[0].setBetAmount(0);
	this.oDisplayManager.showPlayerBetAmount( 0 );
	playerBalanceAmount = this.arrayPlayers[0].getBalanceAmount();
	this.oDisplayManager.showPlayerBalanceAmount( playerBalanceAmount );

};

cGameEngine.prototype.playerHit = function() 
{
	nextCard = this.oPack.getNextCard();
	//console.log("pack now contains " + this.oPack.getCardsCount() + " cards.");
	this.arrayPlayers[0].addCard(nextCard);
	total = this.arrayPlayers[0].getCardsTotal();
	this.oDisplayManager.showPlayerCardsTotal(total);

	this.checkForWinnerOrLooser();

	//this.oDisplayManager.showGuidanceMessage( nextCard.getDescription() );
};

cGameEngine.prototype.playerStand = function() 
{
	this.setState("dealerHitStand");
	this.oDisplayManager.refreshPlayerActionButtons( this );

	this.dealerDecideWhetherToHitOrStand(6);
};

cGameEngine.prototype.dealerHit = function(_showDealerCardsTotal) 
{
	nextCard = this.oPack.getNextCard();
	//console.log("pack now contains " + this.oPack.getCardsCount() + " cards.");
	this.arrayPlayers[1].addCard(nextCard);

	if (_showDealerCardsTotal)
	{
		total = this.arrayPlayers[1].getCardsTotal();
		this.oDisplayManager.showDealerCardsTotal(total);

		//this.oDisplayManager.showGuidanceMessage( nextCard.getDescription() );
	}
};

cGameEngine.prototype.dealerDecideWhetherToHitOrStand = function(_functionCallCount) 
{
	var functionCallCount = _functionCallCount - 1;

	this.setState("dealerDecideWhetherToHitOrStand");
	this.oDisplayManager.refreshPlayerActionButtons( this );

	// show dealer's 2nd card
	total = this.arrayPlayers[1].getCardsTotal();
	this.oDisplayManager.showDealerCardsTotal(total);
	//this.oDisplayManager.showGuidanceMessage( nextCard.getDescription() );

	this.checkForWinnerOrLooser();

	if ( this.getState() == "dealerDecideWhetherToHitOrStand" )
	{
		playerTotal = this.arrayPlayers[0].getCardsTotal();
		dealerTotal = this.arrayPlayers[1].getCardsTotal();
		outcome = this.oAI.dealerDecideWhetherToHitOrStand(playerTotal, dealerTotal);

		switch(outcome)
		{
			case "hit":

				this.dealerHit(true);
				this.checkForWinnerOrLooser();

				if ( this.getState() == "dealerDecideWhetherToHitOrStand" && functionCallCount > 1 )
				{
					this.dealerDecideWhetherToHitOrStand(functionCallCount);
				}

				break;
		}

	}
};
