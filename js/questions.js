window.Questions = (function() {
    'use strict';

    var questions = {
        title: "Ordkunskap",
        currentQ: 0,
        points: 0,
        maxPoints: 15,
        questions: [
            /**
             * Innehåller alla frågor samt rätta svar.
             */
            {
                'question': 'Vad betyder |Hybris/?',
                'one': 'Storhetsvansinne',
                'x': 'Arrogans',
                'two': 'Yrsel',
                'correct': 'one'
            },
            {
                'question': 'Vad betyder |Gnosis/?',
                'one': 'Erfarenhet',
                'x': 'Glädje',
                'two': 'Kunskap',
                'correct': 'two'
            },
            {
                'question': 'Vad betyder |Interfoliera/?',
                'one': 'Inskjuta',
                'x': 'Diskutera',
                'two': 'Avbryta',
                'correct': 'one'
            },
            {
                'question': 'Vad betyder |Katharsis/?',
                'one': 'Spirituell tvist',
                'x': 'Själslig rening',
                'two': 'Andlig upprättelse',
                'correct': 'x'
            },
            {
                'question': 'Vad betyder |Orera/?',
                'one': 'Skrika',
                'x': 'Tala',
                'two': 'Fråga',
                'correct': 'x'
            },
        ],
        init: function() {
            /**
             * Initierar frågetestet.
             */
            var answerButtons = document.querySelectorAll('#questionDiv .answerBtn'),
                nextBtn = document.getElementById('nextQuestion'),
                startBtn = document.getElementById('startQuestionTest');

            startBtn.addEventListener('click', questions.startQuestionTest);
            nextBtn.addEventListener('click', questions.nextQuestion);

            for (var i = 0; i < answerButtons.length; i++) {
                answerButtons[i].addEventListener('click', questions.check);
            }
        },
        startQuestionTest: function() {
            /**
             * Bläddrar från instruktionstexten till själva frågorna.
             */
            document.getElementById('questionStart').classList.add('hidden');
            document.getElementById('questionCont').classList.remove('hidden');
            questions.showQuestion();
        },
        nextQuestion: function() {
            /**
             * Bläddringsfunktion mellan frågorna.
             */
            var newQuestion = questions.currentQ + 1;

            if (questions.questions[newQuestion] !== undefined) {
                questions.currentQ = newQuestion;
                questions.resetInterface();
                questions.showQuestion();
            } else {
                document.getElementById('questionCont').classList.add('hidden');
                document.getElementById('questionEnd').classList.remove('hidden');
                window.Test.calculateScore();
            }
        },
        resetInterface: function() {
            /**
             * Funktion som återställer svarsboxarnas utseende.
             */
            var qDiv = document.getElementById('questionDiv'),
                answerButtons = qDiv.querySelectorAll('.answerBtn'),
                paragraph = document.getElementById('qParagraph'),
                messageContainer = qDiv.querySelector('.messageCont');

            for (var i = 0; i < answerButtons.length; i++) {
                answerButtons[i].classList.remove('correct', 'wrong');
                answerButtons[i].removeAttribute('disabled');
            }

            paragraph.innerHTML = '';
            messageContainer.innerHTML = '';
            messageContainer.classList.remove('correct', 'wrong');

            qDiv.classList.remove('correct', 'wrong');
        },
        showQuestion: function() {
            /**
             * Skriver ut frågan och svarsalternativen.
             */
            var q = questions.questions[questions.currentQ],
                paragraph = document.getElementById('qParagraph'),
                a1 = document.getElementById('answerOne'),
                a2 = document.getElementById('answerX'),
                a3 = document.getElementById('answerTwo');

            paragraph.innerHTML = q.question.replace('|', '<strong>').replace('/', '</strong>');
            a1.innerText = q.one;
            a2.innerText = q.x;
            a3.innerText = q.two;
        },
        check: function(e) {
            /**
             * Kontrollerar ifall svaret var korrekt och kallar på
             * passande funktioner beroende på svaret.
             */
            var answer = e.target.dataset.answer,
                correct = questions.questions[questions.currentQ].correct,
                classSetter = 'wrong',
                answerButtons = document.querySelectorAll('#questionDiv .answerBtn'),
                query = '#questionDiv button[data-answer=' + correct + ']',
                correctionElement = document.querySelector(query),
                correctText = questions.questions[questions.currentQ][correct];

            if (answer === correct) {
                classSetter = 'correct';
                questions.correctAnswer();
            }

            window.Test.showAnswer(correctText, classSetter);

            correctionElement.classList.add('correct');

            document.getElementById('questionDiv').classList.add(classSetter);

            e.target.classList.add(classSetter);

            for (var i = 0; i < answerButtons.length; i++) {
                answerButtons[i].setAttribute('disabled', 'disabled');
            }
        },
        correctAnswer: function() {
            questions.points += 3;
        },
        reset: function() {
            /**
             * Funktion som körs vid Test.reset().
             */
            questions.points = 0;
            questions.currentQ = 0;
            questions.resetInterface();
            questions.showQuestion();
        }
    };

    return questions;
})();
