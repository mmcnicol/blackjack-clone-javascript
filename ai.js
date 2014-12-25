
function cAI() 
{
	//
}

cAI.prototype.dealerDecideWhetherToHitOrStand = function(_playerTotal, _dealerTotal) 
{
	var returnValue = "stand";

	if ( _dealerTotal < _playerTotal ) // must try to beat player's known hand
	{
		returnValue = "hit";
	}
	else if ( _dealerTotal == _playerTotal )
	{
		if ( _dealerTotal < 17 )
		{
			returnValue = "hit";
		}
	}

	return returnValue;
};

