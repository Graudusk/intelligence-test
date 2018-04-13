window.Fizzbuzz = (function() {
    'use strict';

    var fizzbuzz = {
        title: "FizzBuzz",
        points: 0,
        maxPoints: 3,
        secret: '',
        secretIndex: 0,
        fizzbuzzRange: [],
        randIntRange: function(range) {
            /**
             * Skapar ett start och slutvärde.
             */
            var start = Math.floor(Math.random() * 100),
                end = start + range;

            return [start, end];
        },
        fillBtns: function() {
            /**
             * fyller svarsknapparna med värden.
             */
            var container = document.getElementById('fizzBuzzChoices'),
                nodesArray = [],
                fizz, buzz, number, fizzAndBuzz,
                numberVal = fizzbuzz.fizzbuzzRange[fizzbuzz.secretIndex].number;

            container.innerHTML = '';

            document.getElementById('toFizzEnd').classList.add('hidden');

            fizz = document.createElement('button');
            fizz.innerHTML = 'Fizz';
            fizz.setAttribute('data-answer', 'Fizz');

            buzz = document.createElement('button');
            buzz.innerHTML = 'Buzz';
            buzz.setAttribute('data-answer', 'Buzz');

            fizzAndBuzz = document.createElement('button');
            fizzAndBuzz.innerHTML = 'Fizz Buzz';
            fizzAndBuzz.setAttribute('data-answer', 'Fizz Buzz');

            number = document.createElement('button');
            number.innerHTML = numberVal;
            number.setAttribute('data-answer', numberVal);

            nodesArray.push(fizz, buzz, fizzAndBuzz, number);
            nodesArray = window.Test.randomizeArray(nodesArray);

            for (var i = 0; i < nodesArray.length; i++) {
                nodesArray[i].classList.add('answerBtn', 'block');
                nodesArray[i].addEventListener('click', fizzbuzz.check);
                container.appendChild(nodesArray[i]);
            }
        },
        check: function(e) {
            /**
             * Kontrollerar ifall svaret var korrekt.
             */
            var answer = e.target.dataset.answer,
                correct = fizzbuzz.secret.value,
                classSetter = 'wrong',
                answerButtons = document.querySelectorAll('#fizzBuzzChoices .answerBtn'),
                correctElement = document.querySelector('button[data-answer="' + correct + '"]');

            if (answer === correct) {
                classSetter = 'correct';
                fizzbuzz.correctAnswer();
            }

            window.Test.showAnswer(correct, classSetter);

            correctElement.classList.add('correct');

            e.target.classList.add(classSetter);

            for (var i = 0; i < answerButtons.length; i++) {
                answerButtons[i].setAttribute('disabled', 'disabled');
            }

            document.getElementById('toFizzEnd').classList.remove('hidden');
        },
        correctAnswer: function() {
            fizzbuzz.points += 3;
        },
        init: function() {
            /**
             * Initierar Fizzbuzztestet och sätter det dolda värdet.
             */
            var range = fizzbuzz.randIntRange(5),
                secretIndex = Math.floor(Math.random() * range.length),
                fizzbuzzRange = fizzbuzz.fizzbuzz(range[0], range[1]),
                stringElement = document.getElementById('fizzBuzzString'),
                fizzBuzzString = '';

            fizzbuzz.secret = fizzbuzzRange[secretIndex];
            fizzbuzz.secretIndex = secretIndex;

            for (var i = 0; i < fizzbuzzRange.length; i++) {
                var value = i !== secretIndex ? fizzbuzzRange[i].value : 'DOLD';

                fizzBuzzString += value + (i === fizzbuzzRange.length - 1 ? '' : ', ');
            }
            stringElement.innerHTML = fizzBuzzString;
            fizzbuzz.fizzbuzzRange = fizzbuzzRange;
            fizzbuzz.fillBtns();

            document.getElementById('startFizzBuzz').addEventListener('click', function() {
                document.getElementById('fizzBuzzStart').classList.add('hidden');
                document.getElementById('fizzBuzzCont').classList.remove('hidden');
            });

            document.getElementById('toFizzEnd').addEventListener('click', function() {
                document.getElementById('fizzBuzzCont').classList.add('hidden');
                document.getElementById('fizzBuzzEnd').classList.remove('hidden');
                window.Test.calculateScore();
            });
        },
        fizzbuzz: function(start, stop) {
            /**
             * Skapar fizzbuzzserien.
             */
            var retArray = [];

            if (start < stop) {
                for (var i = start; i <= stop; i++) {
                    var retString = '';

                    if (i % 3 && i % 5) {
                        retString += i;
                    }
                    if (i % 3 == 0) {
                        retString += 'Fizz';
                    }
                    if (i % 5 == 0) {
                        retString += (i % 3 == 0 ? ' ' : '') + 'Buzz';
                    }
                    retArray.push({'number': i, 'value': retString});
                }
            } else {
                retArray = 'Error: Start value is smaller that stop value.';
            }

            return retArray;
        },
        reset: function() {
            /**
             * Funktion som körs vid Test.reset().
             */
            this.points = 0;
            this.fillBtns();
        }
    };

    return fizzbuzz;
})();
