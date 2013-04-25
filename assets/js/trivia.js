$(function()
{
	var nextQuestion = function() {
		$('#next_question').hide().text('Siguiente Pregunta');
		$('#question-area').text('...cargando...');

		var new_question_url = '/game/question/' + $('#trivia_title').attr('data-triviaid');

		$.getJSON(new_question_url, function(data) {
			if (typeof data.question === "undefined") {
				$('#question-area').text(data.msg);
				return;
			}

			displayQuestion(data.question, data.answers);
			startTimer();
			$('#timer').on('timeout', timeOut);
			$('#question-area li').on('click', answerClick);
		});
	}

	var displayQuestion = function(question, answers) {
		$('#question-area').empty();

		$('<h1/>', {
			'data-questionid': question.id,
			text: question.question
		}).appendTo('#question-area');
		$('<ul/>').appendTo('#question-area');

		for (var i = 0; i < answers.length; i++) {
			$('<li/>', {
				id: answers[i].id,
				text: answers[i].answer
			}).appendTo('#question-area ul');
		};
	}

	var startTimer = function() {
		var start = new Date().getTime();
		var timer = 60;
		interval = window.setInterval(function() {
			var elapsed = new Date().getTime() - start;
			timer = Math.ceil(60 - elapsed/1000);
			$('#timer').text(timer);
			if (timer == 0) {
				$('#timer').trigger('timeout');
			}
		}, 100);
	}

	var timeOut = function(event) {
		disableAnswering();
		checkAnswer(null, 0);
		wrongAnswer();
		addPoints(0);
	}

	var answerClick = function(event) {
		disableAnswering();

		$(this).addClass('selected');

		var seconds = $('#timer').text();
		var answer_id = $(this).attr('id');

		checkAnswer(answer_id, seconds);
	}

	var disableAnswering = function () {
		$('#question-area li').off('click', answerClick);
		window.clearInterval(interval);
	}

	var checkAnswer = function(answer_id, seconds) {
		$('#answered').text( parseInt( $('#answered').text() ) + 1 );

		var check_answer_url = '/game/answer/';
		var question_id = $('#question-area h1').attr('data-questionid');
		$.post(check_answer_url, { question_id: question_id, answer_id: answer_id, seconds: seconds }, processResults);
	}

	var processResults = function(data) {
		if(data.points == 0) {
			wrongAnswer();
		} else {
			rightAnswer();
		}
		addPoints(data.points);
		revealRightAnswer(data.answer);
	}

	var wrongAnswer = function() {
		$('li.selected').css('color', 'red');
		$('#wrong_answer').fadeIn();
	}

	var rightAnswer = function() {
		$('li.selected').css('color', 'green');
		$('#right_answer').fadeIn();
	}

	var addPoints = function(points) {
		$('#game_points').text(points+' puntos!').fadeIn();
		$('#points').text( parseInt( $('#points').text() ) + parseInt(points) );
	}

	var revealRightAnswer = function(id) {
		$('#'+id).css('color', 'green');
		$('#next_question').fadeIn();
	}

	if ($('#trivia_title').length > 0) {
		//nextQuestion();
		$('#score p').hide();
		$('#next_question button').on('click', nextQuestion);
	}
});
