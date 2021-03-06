$(function()
{
	var nextQuestion = function() {
		scrollPage('#game-area');
		$('#timer').css('display', 'inline-block');

		$('#welcome, #score p, #next_question').hide();
		$('#next_question button').text('Siguiente Pregunta');
		$('#question-area').text('...cargando...');

		var new_question_url = '/game/question/' + $('#trivia_title').attr('data-triviaid');

		$.getJSON(new_question_url, function(data) {
			if (typeof data.question === "undefined") {
				$('#question-area').text(data.msg);
				return;
			}

			restartAnimation();

			displayQuestion(data.question, data.answers);
			startTimer();
			$('#timer').on('timeout', timeOut);
			$('#question-area li').on('click', answerClick);
		});

		//preload audio
		$(document).trigger('initAudio');
	}

	var restartAnimation = function() {
		$('.loader, .mask').css('animation', 'none');
		setTimeout(function() {
			$('.loader, .mask').css('animation', '');
		}, 10);
		$('.loader, .mask').css('animation-play-state', 'running');
	}

	var scrollPage = function(selector) {
		var offset = $(selector).offset().top;
		$('html, body').animate({scrollTop: offset}, 'slow');
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
		var timer = 15000;
		interval = window.setInterval(function() {
			var elapsed = new Date().getTime() - start;
			timer = 15000 - elapsed;
			$('#timer').attr('data-ms', timer);
			$('#seconds').text(Math.ceil(timer/1000));
			if (timer <= 0) {
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

		var miliseconds = $('#timer').attr('data-ms');
		var answer_id = $(this).attr('id');

		$.mbAudio.play('select');

		checkAnswer(answer_id, miliseconds);
	}

	var disableAnswering = function () {
		$('#question-area li').off('click', answerClick).addClass('disabled');
		window.clearInterval(interval);
		$('.loader, .mask').css('animation-play-state', 'paused');
	}

	var checkAnswer = function(answer_id, miliseconds) {
		$('#answered').text( parseInt( $('#answered').text() ) + 1 );

		var check_answer_url = '/game/answer/';
		var question_id = $('#question-area h1').attr('data-questionid');
		$.post(check_answer_url, { question_id: question_id, answer_id: answer_id, miliseconds: miliseconds }, processResults);
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
		$('li.selected').addClass('wrong');
		$('#wrong_answer').fadeIn();
		$.mbAudio.stop('select');
		$.mbAudio.play('wrong');
	}

	var rightAnswer = function() {
		$('#right_answer').fadeIn();
		$.mbAudio.stop('select');
		$.mbAudio.play('right');
	}

	var addPoints = function(points) {
		$('#game_points').text(points+' puntos!').fadeIn();
		$('#points').text( parseInt( $('#points').text() ) + parseInt(points) );
	}

	var revealRightAnswer = function(id) {
		$('#'+id).addClass('right');
		$('#next_question').fadeIn();
	}

	if ($('#trivia_title').length > 0) {
		//nextQuestion();
		$('#score p, #timer').hide();
		$('#next_question button').on('click', nextQuestion);

		//less no agrega bien esta regla :(
		$('.mask').css('border-radius', '100% 0 0 100% / 50% 0 0 50%');
	}

	//VALIDATION
	var hasFormValidation = function() {
		return (typeof document.createElement( 'input' ).checkValidity == 'function');
	}

	//validation using ketchup plugin
	if( ! hasFormValidation() ) {
		$('.validate-form').ketchup({}, {
			'[required]': 'required',
			'[type="email"]': 'email',
			'#username': 'rangelength(4, 32)'
		});
	}

	//SOUND EFFECTS
	$.mbAudio.sounds = {

		select: {
			id: "select",
			mp3: "/sounds/162462__kastenfrosch__secret.mp3"
		},
		wrong: {
			id: "wrong",
			mp3: "/sounds/162465__kastenfrosch__lostitem.mp3"
		},
		right: {
			id: "right",
			mp3: "/sounds/162467__kastenfrosch__gotitem.mp3"
		},
	};

	$(document).on("initAudio", function () {
		$.mbAudio.preload();
	});
});
