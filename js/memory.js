window.Memory = (function() {
    'use strict';

    var memory = {
        title: "Minnestest",
        flagList: [],
        timer: null,
        points: 0,
        maxPoints: 9,
        flagObjects: [
            /**
             * Data som behövs för att skapa flaggelementen.
             */
            {
                name: "Sweden",
                id: 1,
                parts: 2
            },
            {
                name: "France",
                id: 2,
                parts: 2
            },
            {
                name: "Greece",
                id: 3,
                parts: 6
            },
            {
                name: "Japan",
                id: 4,
                parts: 1
            },
            {
                name: "Finland",
                id: 5,
                parts: 2
            },
            {
                name: "Denmark",
                id: 6,
                parts: 2
            },
            {
                name: "Germany",
                id: 7,
                parts: 2
            },
            {
                name: "Hungary",
                id: 8,
                parts: 2
            },
            {
                name: "Czechia",
                id: 9,
                parts: 2
            }
        ],
        init: function() {
            /**
             * Funktion som initierar minnestestet.
             */
            var endMemoryBtn = document.getElementById('endMemoryBtn');

            document.getElementById('startMemory').addEventListener('click', function() {
                document.getElementById('memoryStart').classList.add('hidden');
                document.getElementById('memoryCont').classList.remove('hidden');
                memory.startTimer();
            });

            endMemoryBtn.addEventListener('click', function() {
                document.getElementById('memoryCont').classList.add('hidden');
                document.getElementById('memoryEnd').classList.remove('hidden');

                window.Test.calculateScore();
            });

            this.initFlags();
        },
        startTimer: function() {
            /**
             * gömmer flaggorna och skapar svarslistan efter 5 sekunders fördröjning.
             */
            this.timer = window.setTimeout(function() {
                memory.hideFlags();
                memory.fillList();
            }, 5000);
        },
        hideFlags: function() {
            /**
             * Döljer flaggorna.
             */
            var flags = memory.getFlags();

            for (var i = 0; i < flags.length; i++) {
                flags[i].classList.add('hide');
                if (!flags[i].classList.contains('active')) {
                    flags[i].addEventListener('click', memory.check);
                    flags[i].classList.add('active');
                }
            }
        },
        check: function(event) {
            /**
             * Funktion som körs när användaren klickar på dold flagga.
             * Kollar ifall rätt flagga valts, ger i så fall ett poäng
             * och avslutar spelet ifall fel flagga valts.
             */
            var flagId = event.target.id,
                correctId = memory.flagList[0];

            if (flagId == correctId) {
                memory.points += 1;
                memory.showFlag(event.target, 'correct');
                memory.flagList.shift();
                if (memory.flagList.length === 0) {
                    memory.showNextBtn('correct');
                }
            } else {
                memory.lost();
            }
        },
        showNextBtn: function(type) {
            /**
             * Funktion som körs när minnestestet är avslutat.
             */
            var endMemoryBtn = document.getElementById('endMemoryBtn');

            endMemoryBtn.classList.remove('hidden');

            var currSect = document.getElementById(window.Test.currentSection),
                messageContainer = currSect.querySelector('.messageCont'),
                messageEl = document.createElement('p'),
                message = type == 'correct' ? 'Du klarade det!' : 'Fel! Du klarade inte alla.';

            messageContainer.classList.add(type);

            messageEl.innerHTML = message;
            messageEl.classList.add('message');

            messageContainer.appendChild(messageEl);
        },
        showFlag: function(element, correct) {
            /**
             * Visar den valda flaggan.
             */
            element.classList.remove('hide', 'active');
            element.classList.add(correct);
            element.removeEventListener('click', memory.check);
        },
        lost: function() {
            /**
             * Funktion som körs vid förlust.
             */
            memory.showFlags();
            memory.showNextBtn('wrong');
        },
        getFlags: function() {
            return document.querySelectorAll('.wrapper');
        },
        showFlags: function() {
            var flags = memory.getFlags();

            for (var i = 0; i < flags.length; i++) {
                memory.showFlag(flags[i], 'wrong');
            }
        },
        printParts: function(times) {
            /**
             * Funktion som skriver ut en flaggas html-kod.
             */
            var html = "";

            for (var i = 0; i < times; i++) {
                html += '<div class="part' + (i + 1) + '"></div>';
            }

            return html;
        },
        createFlag: function(id) {
            /**
             * Funktion som skapar flagga.
             */
            var element = document.createElement("div"),
                parts = memory.printParts(memory.flagObjects[id].parts);

            element.className = "flag " + memory.flagObjects[id].name.toLowerCase();

            element.innerHTML = parts;

            return element;
        },
        fillList: function() {
            /**
             * Skapar svarslistan som skrivs ut till vänster om flaggorna.
             */
            var memoryListCont = document.getElementById('memoryListCont');

            memory.tempObject = window.Test.randomizeArray(memory.flagObjects);

            memoryListCont.innerHTML = '';

            for (var i = 0; i < memory.tempObject.length; i++) {
                var paragraph = document.createElement('p'),
                    number = i + 1;

                memory.flagList.push(memory.tempObject[i].id);

                paragraph.innerHTML = number + '. ' +  memory.tempObject[i].name;
                memoryListCont.appendChild(paragraph);
            }
        },
        initFlags: function() {
            /**
             * Skapar alla flaggobjekt och lägger dom på sidan.
             */
            window.Test.randomizeArray(memory.flagObjects);
            for (var i = 0; i < memory.flagObjects.length; i++) {
                var wrapper = document.createElement("div"),
                    content = document.getElementById('memoryFlagsCont'),
                    flag = memory.createFlag(i);

                wrapper.className = "wrapper";

                wrapper.setAttribute("id", memory.flagObjects[i].id);

                wrapper.appendChild(flag);
                content.appendChild(wrapper);
            }
        },
        reset: function() {
            this.points = 0;
            memory.hideFlags();
            memory.resetInterface();
        },
        resetInterface: function() {
            /**
             * Funktion som körs vid Test.reset().
             */
            var endMemoryBtn = document.getElementById('endMemoryBtn'),
                currSect = document.getElementById(window.Test.currentSection),
                messageContainer = currSect.querySelector('.messageCont'),
                flags = memory.getFlags();

            endMemoryBtn.classList.add('hidden');
            messageContainer.classList.remove('wrong', 'correct');
            messageContainer.innerHTML = '';

            for (var i = 0; i < flags.length; i++) {
                flags[i].classList.remove('correct', 'wrong');
            }

            memory.flagList = [];
            for (var o = 0; o < memory.tempObject.length; o++) {
                memory.flagList.push(memory.tempObject[o].id);
            }
        }
    };

    return memory;
})();
