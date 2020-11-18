let app = new Vue({
    el: '#app',
    data: {
        inputOne: [],
        inputTwo: [],
        inputThree: [],
        inputFour: [],
        stage: '1',
        url: '',
        gameLink: ''
    },
    methods: {
        createCards: function() {
            this.updateCardsOne()
            this.updateCardsTwo()
            this.updateCardsThree()
            this.updateCardsFour()
        },
        createArray: function(str) {
            //console.log(str)
            if (str) {
                if (Array.isArray(str)) {
                    return str;
                } else {
                    return str.split(',');
                }
            }
        },
        clickCard: function(event) {
            event.target.style.transform = 'translate(0, -2em)';
            event.target.style.opacity = '0';

            setTimeout(function(){
                event.target.style.display = 'none';
                event.target.style.transform = 'translate(0, 0)';
                event.target.style.opacity = '1';

                let nextCard = event.target.nextElementSibling;
                if (nextCard) {
                    nextCard.style.display = 'block';
                    nextCard.style.transform = 'translate(0, 0)';
                    nextCard.style.opacity = '1';

                } else {
                    let firstCard = event.target.parentNode.firstElementChild;
                    firstCard.style.display = 'block';
                    firstCard.style.transform = 'translate(0, 0)';
                    firstCard.style.opacity = '1';
                }

            }, 250);
        },
        createGameLink: function() {
            if (this.inputOne.length >= 1 || this.inputTwo.length >= 1 || this.inputThree.length >= 1 || this.inputFour.length >= 1) {
                let strOne = '',
                    strTwo = '',
                    strThree = '',
                    strFour = '';

                if (this.inputOne.length >= 1) {
                    strOne = '&one='+this.inputOne;
                }
                if (this.inputTwo.length >= 1) {
                    strTwo = '&two='+this.inputTwo;
                }
                if (this.inputThree.length >= 1) {
                    strThree = '&three='+this.inputThree;
                }
                if (this.inputFour.length >= 1) {
                    strFour = '&four='+this.inputFour;
                }

                this.gameLink = this.url+'?'+strOne+strTwo+strThree+strFour;

            } else {
                this.gameLink = 'There was an error. Please try again.'
            }
        },
        inputSelection: function(event) {
            event.target.select()
            document.execCommand('copy')
        },
        updateCardsOne: function() {
            this.inputOne = this.createArray(this.inputOne);
        },
        updateCardsTwo: function() {
            this.inputTwo = this.createArray(this.inputTwo);
        },
        updateCardsThree: function() {
            this.inputThree = this.createArray(this.inputThree);
        },
        updateCardsFour: function() {
            this.inputFour = this.createArray(this.inputFour);
        }
    },
    created() {
        let url = window.location.href;
        let urlObj = new URL(url);
        let one = urlObj.searchParams.get('one');
        let two = urlObj.searchParams.get('two');
        let three = urlObj.searchParams.get('three');
        let four = urlObj.searchParams.get('four');

        this.url = url;

        if (one || two || three || four) {

            this.stage = '2';

            if (one) {
                this.inputOne = one.split(',');
            }
            if (two) {
                this.inputTwo = two.split(',');
            }
            if (three) {
                this.inputThree = three.split(',');
            }
            if (four) {
                this.inputFour = four.split(',');
            }

        }
    },
    mounted() {
        this.$el.classList.add('app-mounted')
    }
})
