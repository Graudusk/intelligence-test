window.Test = (function() {
    'use strict';

    var test = {
        /**
         * sections är de olika deltest eller sidor som
         * finns på sidan som användaren ska bläddra mellan.
         */
        sections: [
            'welcome',
            'questions',
            'fizzbuzz',
            'memory',
            'results'
        ],
        points: 0,
        currentSection: 'welcome',
        init: function() {
            /**
             * funktion som binder funktioner till bläddringsknapparna.
             */
            var browseBtns = document.querySelectorAll('.browse');

            for (var i = 0; i < browseBtns.length; i++) {
                var dir = browseBtns[i].classList.contains('next') ? 1 : -1;

                browseBtns[i].addEventListener('click', function() {
                    test.browse(dir);
                });
            }
        },
        getAllSections: function() {
            return document.querySelectorAll('.section');
        },
        browse: function(dir) {
            /**
             * Bläddringsfunktion
             */
            var newSection = test.sections.indexOf(test.currentSection) + dir;

            if (test.sections[newSection] !== undefined) {
                test.currentSection = test.sections[newSection];
            }


            test.showCurrentSection();
        },
        showAnswer: function(text, type) {
            /**
             * Visar det rätta svaret på frågan.
             * Skapar textelement och lägger in dem på sidan.
             * Klass som bestämmer utseende beroende på ifall svaret
             * är rätt eller fel.
             */
            var currSect = document.getElementById(test.currentSection),
                messageContainer = currSect.querySelector('.messageCont'),
                messageEl = document.createElement('p'),
                correctText = document.createElement('p'),
                message = type == 'correct' ? 'Rätt svar!' : 'Fel svar!';

            messageContainer.classList.add(type);

            messageEl.innerHTML = message;
            messageEl.classList.add('message');
            correctText.classList.add('correctText');
            correctText.innerHTML = 'Rätt svar är: ' + text;

            messageContainer.appendChild(messageEl);
            messageContainer.appendChild(correctText);
        },
        showCurrentSection: function() {
            var sections = test.getAllSections(),
                currSect = document.getElementById(test.currentSection);

            for (var i = 0; i < sections.length; i++) {
                sections[i].classList.add('hidden');
            }

            if (test.currentSection == 'results') {
                test.calculateTotalScore();
            }

            currSect.classList.remove('hidden');
        },
        reset: function() {
            /**
             * Återställer utseendet på sidan och poängen på deltestet.
             * anropar dynamiskt utörligare funktion från nuvarande deltestets
             * modul.
             */
            var currSect = document.getElementById(test.currentSection),
                messageContainer = currSect.querySelector('.messageCont');

            if (messageContainer !== null) {
                messageContainer.classList.remove('correct', 'wrong');
                messageContainer.innerHTML = '';
            }

            if (window[test.capitalize(test.currentSection)] !== undefined) {
                window[test.capitalize(test.currentSection)].reset();
            }
        },
        randomizeArray: function(array) {
            /**
             * Funktion som slumpmässigt kastar om värdena i en array.
             */
            var currentIndex = array.length,
                temp,
                randomIndex;

            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temp = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temp;
            }

            return array;
        },
        capitalize: function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        calculateScore: function() {
            /**
             * Funktion som räknar ut poäng för deltest.
             */
            var currSect = document.getElementById(test.currentSection),
                resultCont = currSect.querySelector('.resultCont'),
                currScore = window[test.capitalize(test.currentSection)].points,
                maxScore = window[test.capitalize(test.currentSection)].maxPoints,
                title = window[test.capitalize(test.currentSection)].title;

            resultCont.innerHTML = '<p>' + title + '</p>';
            resultCont.innerHTML += '<p>Din poäng: ' + currScore + '</p>';
            resultCont.innerHTML += '<p>Max möjliga poäng: ' + maxScore + '</p>';
        },
        calculateTotalScore: function() {
            /**
             * Funktion som räknar ut den totala poängen.
             */
            var currSect = document.getElementById(test.currentSection),
                resultCont = currSect.querySelector('.resultCont'),
                totalScore = 0,
                totalMaxScore = 0;

            resultCont.innerHTML = '';

            for (var i = 0; i < test.sections.length; i++) {
                if (window.hasOwnProperty(test.capitalize(test.sections[i]))) {
                    var score = window[test.capitalize(test.sections[i])].points,
                        maxScore = window[test.capitalize(test.sections[i])].maxPoints,
                        title = window[test.capitalize(test.sections[i])].title;

                    totalScore += score;
                    totalMaxScore += maxScore;

                    resultCont.innerHTML += '<p>' + title + '</p>';
                    resultCont.innerHTML += '<p>Din poäng: ' + score + '</p>';
                    resultCont.innerHTML += '<p>Max möjliga poäng: ' + maxScore + '</p>';
                    resultCont.innerHTML += '<hr>';
                }
            }

            totalScore = (totalScore / totalMaxScore) * 2;
            totalScore = Math.round(totalScore * 100) / 100;
            totalMaxScore = 2.0;

            resultCont.innerHTML += '<p>Totalt</p>';
            resultCont.innerHTML += '<p>Din intelligenskvot: ' + totalScore + '</p>';
            resultCont.innerHTML += '<p>Maximala möjliga intelligenskvot: 2.0 </p>';
        }
    };

    return test;
})();
