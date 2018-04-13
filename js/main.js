(function() {
    'use strict';

    /**
     * Initierar testet och alla moduler.
     */
    window.Test.init();
    window.Questions.init();
    window.Fizzbuzz.init();
    window.Memory.init();

    /**
     * Skapar en dummy-funktion som möjliggör exekvering
     * av kommandot "Test.reset()".
     */
    var Test = {};

    Test.reset = window.Test.reset;

    window.console.log('Sandlådan är klar!!');
})();
