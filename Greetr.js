
; (function (global, $) {

    // 'new' an object
    const Greetr = function (firstname, lastname, language) {
        return new Greeter.init(firstname, lastname, language);
    }

    // hidden within the scope of the IIFE and never directly accessible
    const supportedLangs = [
    'english', 'spanish', 'mandarin',
    'french', 'german', 'italian', 'portuguese', 
    'hindi', 'persian', 'russian', 'japanese', 'korean', 
    'turkish', 'mongolian', 'kazakh', 'hungarian', 'arabic',
    'hausa', 'swahili', 'dutch', 'indonesian'
    ];

    //informal greetings
    const greetings = {
        english: 'Hello',
        spanish: 'Hola',
        mandarin: '你好',
        french: 'Bonjour',
        german: 'Hallo',
        italian: 'Ciao',
        portuguese: 'Olá',
        hindi: 'नमस्ते',
        persian: 'سلام',
        russian: 'Привет',
        japanese: 'こんにちは',
        korean: '여보세요',
        turkish: 'Merhaba',
        mongolian: 'Сайн уу',
        kazakh: "Сәлеметсіз бе",
        hungarian: 'Szia',
        arabic: 'مرحبا',
        hausa: 'Sannu',
        swahili: 'Jambo',
        dutch: 'Hallo',
        indonesian: 'Halo'
    };

    //formal greetings
    const formalGreetings = {
        english: 'Greetings',
        spanish: 'Saludos',
        mandarin: '问候',
        french: 'Salutations',
        german: 'Schöne Grüße',
        italian: 'Saluti',
        portuguese: 'Saudações',
        hindi: 'अस्सलाम वालेकुम',
        persian: 'با درود',
        russian: 'Привет',
        japanese: 'ご挨拶',
        korean: '인사말',
        turkish: 'Selamlar',
        mongolian: 'Мэндчилгээ',
        kasakh: "Құттықтау",
        hungarian: 'Üdvözlet',
        arabic: 'تحية طيبة',
        hausa: 'Gaisuwa',
        swahili: 'Salamu',
        dutch: 'Groeten',
        indonesian: 'Salam pembuka'
    };

    //console.log messages
    const logMessages = {
        english: 'Logged in',
        spanish: 'Inicio sesion'
    };

    //prototype holds methods (to save memory space)
    Greetr.prototype = {

        // 'this' refers to the calling object at execution time
        fullName: function () {
            return this.firstname + ' ' + this.lastname;
        },

        validate: function () {
            //check if its a valid language
            //references the externally inaccessable 'supportedLangs' within the closure
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },

        //retrieve messages from object by refferring to propeties using [] syntax
        greeting: function () {
            return greetings[this.language] + ' ' + this.firstname + '!';
        },

        formalGreeting: function () {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        //chainable methods return their own containing object
        greet: function (formal) {
            let msg;

            //if undefinded or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting()
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            //makes the method chainable
            return this;
        },

        log: function () {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }

            //make chainable
            return this;
        },

        setLang: function (lang) {

            //set the language
            this.language = lang;

            //validate
            this.validate();

            //make chainable
            return this;
        },

        jQueryGreet: function (selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }
            if (!selector) {
                throw 'Missing jQuery'
            }

            //determine the message
            let msg;
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            //inject the message in the chosen place in the DOM
            $(selector).html(msg);

            //make chainable
            return this;
        },

        vanillaGreet: function (selector, formal) {

            if (!selector) {
                throw 'Nothing selected'
            }

            //determine the message
            let msg;
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            //grab selected element
            const element = document.querySelector(selector);

            //inject the message in the chosen place in the DOM
            element.innerHTML = msg;

            //make chainable
            return this;
        }

    };

    //the actual object is created here, allowing us to 'new' an object w/out calling 'new'
    Greetr.init = function (firstname, lastname, language) {
        const self = this;

        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'english';

        self.validate();
    }

    //any obj created w/ this function as a function constructor, that's where the proto prop is pointing.
    //we do this so we don't have to keep using the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    //attach our Greetr to the global object, and provide a shorthand '$G' 
    global.Greeter = global.G$ = Greetr;

})(window, jQuery);