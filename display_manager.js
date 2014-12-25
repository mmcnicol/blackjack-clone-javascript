

function cDisplayManager()
{
	this.currencySymbol = "&pound;";
}

cDisplayManager.prototype.init = function() 
{
	$("#placeholder")
		.append("<div id='playerDealer'></div>")
		.append("<div id='player1'></div>");

	$("#player1")
		.append("<div id='betButtons'></div>")
		.append("<div id='balanceAmount'></div>")
		.append("<div id='betAmount'></div>")
		.append("<div id='dealerCardsTotal'></div>")
		.append("<div id='playerCardsTotal'></div>")
		.append("<div id='actionButtons'></div>")
		.append("<div id='guidanceMessage'></div>");
};


cDisplayManager.prototype.addBetButton = function(_name, _objPlayerHuman, _objGameEngine) 
{
	$("#betButtons").append("<input type='button' id='" + _name + "' value='" + _name + "' >");

	$( "#" + _name ).click(function() 
	{
		_objGameEngine.incrementPlayerBet( _name ); //  this line is not working, not sure why?
		//_objPlayerHuman.incrementPlayerBet( _name );
		//_objGameEngine.showGuidanceMessage("");
		_objGameEngine.updatePlayerActionButtons();
	});

};

cDisplayManager.prototype.refreshPlayerActionButtons = function(_objGameEngine) 
{
	//console.log("cDisplayManager.refreshPlayerActionButtons()");

	switch ( _objGameEngine.getState() )
	{
		case "newGame-waitingForBetToBePlaced":

/*			
			$("#actionButtons")
				.empty();

			break;

		case "waitingForButtonDeal":
*/
			$("#actionButtons")
				.empty()
				.append("<input type='button' id='Deal' value='Deal' >");

			$( "#Deal" ).click(function() 
			{
				_objGameEngine.deal();
				_objGameEngine.updatePlayerActionButtons();
			});

			break;

		case "dealing-initial":
		case "dealerDecideWhetherToHitOrStand":
		case "cannot-start-new-game--no-money":

			$("#actionButtons").empty();

			break;

		case "winner-player":
		case "winner-dealer":
		case "end-game-draw":

			$("#actionButtons")
					.empty()
					.append("<input type='button' id='PlayAgain' value='Play Again' >");

				$( "#PlayAgain" ).click(function() 
				{
					_objGameEngine.newGame();
				});

			break;

		case "waitForButtonHitStand":

			$("#actionButtons")
				.empty()
				.append("<input type='button' id='Stand' value='Stand' >")
				.append("<input type='button' id='Hit' value='Hit' >");

			$( "#Stand" ).click(function() 
			{
				_objGameEngine.playerStand();
				//_objGameEngine.updatePlayerActionButtons();
			});

			$( "#Hit" ).click(function() 
			{
				_objGameEngine.playerHit();
				//_objGameEngine.updatePlayerActionButtons();
			});

			break;



	}
};

cDisplayManager.prototype.showPlayerBalanceAmount = function(_balanceAmount) 
{

	$("#balanceAmount")
		.empty()
		.html("current balance: "  + this.currencySymbol + _balanceAmount);
};

cDisplayManager.prototype.showPlayerBetAmount = function(_betAmount) 
{

	$("#betAmount")
		.empty()
		.html("bet amount: "  + this.currencySymbol + _betAmount);
};


cDisplayManager.prototype.showDealerCardsTotal = function(_total) 
{

	$("#dealerCardsTotal")
		.empty()
		.html("dealerCardsTotal: "  + _total);
};

cDisplayManager.prototype.showPlayerCardsTotal = function(_total) 
{

	$("#playerCardsTotal")
		.empty()
		.html("playerCardsTotal: " + _total);
};

cDisplayManager.prototype.clearDealerAndPlayerCards = function() 
{
	$("#dealerCardsTotal").empty();
	$("#playerCardsTotal").empty();
};

cDisplayManager.prototype.showGuidanceMessage = function(_guidanceMessage) 
{

	$("#guidanceMessage")
		.empty()
		.html( _guidanceMessage );
};
