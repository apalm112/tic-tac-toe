/* eslint-disable*/
// ABOVE LINE DISABLES ESLINT FOR THIS FILE.
// Treehouse Project-04: Tic-Tac-Toe Game
'use strict';
(function(module) {
/*
  From Treehouse The Module Pattern:

  (function() {
    // code
  }(window) );

  That is the self-enclosing function or
  the module pattern.
  Can also use a '+' or '!' sign,

  !function(module) {
    // code
  }(window);
*/
// Global Variables -----------------------------------------------------
  // Get the start screen div
  const $start = $('#start');
  // Get the button that hides the start screen
  const $button = $('.button');
  // Get 'O' win game div
  const $finish1 = $('#finish1');
  const $finish2 = $('#finish2');
  const $tie = $('#tie');
  // Gets 'O' & 'X' divs at top of game board
	const $player2 = $('#player2');
  const $player1 = $('#player1');
  // Gets entire game board div
	// Gets ul of of game board
  const $board = $('.boxes');
	const $box = $('.box');
	const checkWinArr = [
	// Win combos for $board[0].childNodes[idx], which matches teh DOM!
// HORIZONTAL
	[1, 3, 5],
	[7, 9, 11],
	[13, 15, 17],
// DIAGONAL
	[1, 9, 17],
	[5, 9, 13],
// VERTICAL
	[1, 7, 13],
	[3, 9, 15],
	[5, 11, 17]
];
  let turn = 0;
  const player1 = {
    svg: 'img/o.svg',
    boxFill: 'box-filled-1',
		grid: 'O',
    isWinner: false,
  };
  const player2 = {
    svg: 'img/x.svg',
    boxFill: 'box-filled-2',
		grid: 'X',
    isWinner: false,
  };
// Main Functions ------------------------------------------------------------
  // On page load, show the start screen.
  $(document).ready(function() {
    $start.css('display', 'block');
    // Hide the various winning screens.
    $finish1.css('display', 'none');
    $finish2.css('display', 'none');
    $tie.css('display', 'none');
    // call a function which controls the start button
    // and won't start game until a name is entered
		startGame();
  });

  function enterName() {
    // Meets rubric EC: On the start screen, prompt the user add their name before the game starts.
    const playerOneInput = document.getElementById('name1');
    const playerOneLabel = document.getElementsByClassName('nameOne');
    const playerTwoInput = document.getElementById('name2');
    const playerTwoLabel = document.getElementsByClassName('nameTwo');

    if (playerOneInput.value !== '' && playerTwoInput.value !== '') {
      // Meets rubric: Display the player’s name on the board screen during game play
      playerOneLabel[0].textContent = playerOneInput.value;
      playerTwoLabel[0].textContent = playerTwoInput.value;
      $start.css('display', 'none');
    } else {
      playerOneInput.placeholder = 'Enter Player 1 Name!';
      playerTwoInput.placeholder = 'Enter Player 2 Name!';
    }
  }

  function startGame() {
    // On button click, start the game.
    $button.on('click', function() {
      enterName();
	    $start.css('display', 'none');
			setGridToZero('MT');
			$player1.toggleClass('active');
			hover(player1);
			clickIt();
    });
  }

  function setGridToZero(num) {
		// Sets game grid li's class="box", gridValue="MT" for a new game.
    for (let idx=0;idx<$box.length;idx++) {
     $box[idx].setAttribute('gridValue', num);
		 // reset $board li class="box" & reset background
		 $box.removeClass().addClass('box');
		 $box[idx].style.backgroundColor = '';
		 $box[idx].style.backgroundImage = '';
    }
  }

  function hover(player) {
		// Function checks for player active status & if grid square is empty, if so then displays current player symbol on grid square & removes it.
		if ($player1.hasClass('active'))  {
		  	$('.box').hover(function() {
					if ( $(this).attr('gridvalue') === 'MT') {
					$(this).css({'backgroundImage': 'url(' + player1.svg + ')'});
					}
				}, function() {
						if ( $(this).attr('gridvalue') === 'MT') {
							$(this).css({'backgroundImage': ''});
						}
					 }
				);
		} else if ($player2.hasClass('active')) {
			$('.box').hover(function() {
				if ( $(this).attr('gridvalue') === 'MT') {
				$(this).css({'backgroundImage': 'url(' + player2.svg + ')'});
				}
			}, function() {
					if ( $(this).attr('gridvalue') === 'MT') {
						$(this).css({'backgroundImage': ''});
					}
				 }
			);
		}
	}

  function clickIt() {
    $('.box').one('click', function() {
			// Conditional checks the board li to see if it's MT, if MT then set color/img to current player.
      if ($(this)[0].attributes[1].value === 'MT') {
        if ( $player1.hasClass('active') ) {
					$(this).addClass(player1.boxFill);
					// Set value to 'O' or 'X'
					$(this)[0].setAttribute('gridValue', player1.grid);
          turn++;
          togglePlayer(player1);
        } else if ( $player2.hasClass('active') ) {
					$(this).addClass(player2.boxFill);
          // Set value to 'O' or 'X'
          $(this)[0].setAttribute('gridValue', player2.grid);
          turn++;
          togglePlayer(player2);
        }
      }
		});
  }

  function togglePlayer(player) {
    // Changes turns between player X and O.
    $player1.toggleClass('active');
    $player2.toggleClass('active');
    hover(player2);
		if (turn >= 5) {
			checkWin(player);
		}
  }

	function checkWin(player) {
		// Function to check for Win/Tie
		//	Tie twoDimArr into $('.boxes'); childNodes[] thur childNodes[17] ODD ONLY!
		// $board[0].childNodes[1].outerHTML.includes('O');
			if ( $board[0].childNodes[1].outerHTML.includes(player.grid) && $board[0].childNodes[7].outerHTML.includes(player.grid) && $board[0].childNodes[13].outerHTML.includes(player.grid) ) {
				player.isWinner = true;
				console.log(player.grid + ' is winner');
			} else if ($board[0].childNodes[3].outerHTML.includes(player.grid) && $board[0].childNodes[9].outerHTML.includes(player.grid) && $board[0].childNodes[15].outerHTML.includes(player.grid)) {
				player.isWinner = true;
				console.log(player.grid + ' is winner');
			} else if ($board[0].childNodes[5].outerHTML.includes(player.grid) && $board[0].childNodes[11].outerHTML.includes(player.grid) && $board[0].childNodes[17].outerHTML.includes(player.grid)) {
				player.isWinner = true;
				console.log(player.grid + ' is winner');
			} else if ($board[0].childNodes[1].outerHTML.includes(player.grid) && $board[0].childNodes[3].outerHTML.includes(player.grid) && $board[0].childNodes[5].outerHTML.includes(player.grid)) {
				player.isWinner = true;
				console.log(player.grid + ' is winner');
			} else if ($board[0].childNodes[7].outerHTML.includes(player.grid) && $board[0].childNodes[9].outerHTML.includes(player.grid) && $board[0].childNodes[11].outerHTML.includes(player.grid)) {
				player.isWinner = true;
				console.log(player.grid + ' is winner');
			} else if ($board[0].childNodes[13].outerHTML.includes(player.grid) && $board[0].childNodes[15].outerHTML.includes(player.grid) && $board[0].childNodes[17].outerHTML.includes(player.grid)) {
				player.isWinner = true;
				console.log(player.grid + ' is winner');
			} else if ($board[0].childNodes[1].outerHTML.includes(player.grid) && $board[0].childNodes[9].outerHTML.includes(player.grid) && $board[0].childNodes[17].outerHTML.includes(player.grid)) {
				player.isWinner = true;
				console.log(player.grid + ' is winner');
			} else if ($board[0].childNodes[5].outerHTML.includes(player.grid) && $board[0].childNodes[9].outerHTML.includes(player.grid) && $board[0].childNodes[13].outerHTML.includes(player.grid)) {
				player.isWinner = true;
				console.log(player.grid + ' is winner');
			}
		winner();
		checkTie(player);
	}

	function checkTie(player) {
		if (turn === 9 && player1.isWinner === false && player2.isWinner === false){
			winner();
		}
	}

	function winner() {
		if (player1.isWinner) {
			const player1Winner = document.getElementsByClassName('nameOne');
			let setPlayer1Winner = document.getElementsByClassName('wrapper-O');
			$finish1.css('display', 'block');
			reStartGame();
			if (player1Winner[0].textContent !== 'Player One') {
				setPlayer1Winner[0].children[0].children[0].textContent = (player1Winner[0].textContent + ' Wins!');
			} else {
				setPlayer1Winner[0].children[0].children[0].textContent = ' Winner';
			}
		} else if (player2.isWinner) {
			const player2Winner = document.getElementsByClassName('nameTwo');
			let setPlayer2Winner = document.getElementsByClassName('wrapper-X');
			$finish2.css('display', 'block');
			reStartGame();
			if (player2Winner[0].textContent !== 'Player Two') {
				setPlayer2Winner[0].children[0].children[0].textContent = (player2Winner[0].textContent + ' Wins!');
			} else {
				setPlayer2Winner[0].children[0].children[0].textContent = 'Winner';
			}
		} else if (!player1.isWinner && !player1.isWinner && turn === 9) {
			$tie.css('display', 'block');
			reStartGame();
		}
	}
		// TODO:  Finish CSS for win1 & win2 screens



		function reStartGame() {
			for (let idx=1;idx<$button.length;idx++) {
				$button[idx].text = 'Press for New Game';
			}

			$button.one('click', function() {
		    $finish1.css('display', 'none');
		    $finish2.css('display', 'none');
				$tie.css('display', 'none');
				turn=0;
	      setGridToZero('MT');

				player1.isWinner = false;
				player2.isWinner = false;

				// Toggle players to reset for new game.
				if ($player2.hasClass('active')) {
					$player2.toggleClass('active');
				}
	      if ( !$player1.hasClass('active') ) {
					$player1.toggleClass('active');
				};
	      hover(player1);
	    });
		}

		// TODO: PUSH GOALS
		//Add programming to support playing against the computer. Only one player plays; the other is controlled by your programming.
})(window);
