$(document).ready(function() {
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;

    function loadQuestions() {
        $.getJSON('test.json', function(data) {
            questions = data;
            $('#totalQuestions').text(questions.length);
            loadQuestion();
        });
    }

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            $('#questionNumber').text(currentQuestionIndex + 1);
            $('#questionText').text(question.question);
            $('#optionsForm').empty();
            question.options.forEach((option, index) => {
                $('#optionsForm').append(`
                    <div>
                        <input type="radio" name="option" value="${index}" id="option${index}">
                        <label for="option${index}">${option}</label>
                    </div>
                `);
            });
            startTimer();
        } else {
            showResults();
        }
    }

    function startTimer() {
        let timeLeft = 10;
        $('#timer').text(timeLeft);
        clearInterval(timer);
        timer = setInterval(function() {
            timeLeft--;
            $('#timer').text(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timer);
                checkAnswer();
            }
        }, 1000);
    }

    function checkAnswer() {
        const selectedOption = $('input[name="option"]:checked').val();
        if (selectedOption == questions[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        loadQuestion();
    }

    function showResults() {
        const name = prompt('Введите ваше имя:');
        alert(`Поздравляем, ${name}! Тест сдан на ${score} балл(ов).`);
    }

    $('#submitAnswer').click(function() {
        clearInterval(timer);
        checkAnswer();
    });

    loadQuestions();
});
