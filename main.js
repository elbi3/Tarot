//Card constructor
function Card() {
    this.visible = false;
    this.played = false;
    this.show = function () {
        this.visible = true;
    };
    this.hide = function () {
        this.visible = false;
    };
};
//Tarot Card constructor
function TarotCard(suit, rank) {
    this.suit = suit;
    this.rank = rank;
};
//Set up the Card object to be the Prototype of TarotCard object, similar to "extends" keyword:
Object.setPrototypeOf(TarotCard.prototype, Card.prototype); 

function TarotDeck() {
    this.coins = [];
    this.wands = [];
    this.swords = [];
    this.cups = [];
    this.majorArcana = [];
    this.minorArcana = [];
//method1 //create minor arcana
    this.createMinorArcana = function(){
        //minor arcana: //56 unique cards
        const ranks = ["Ace","2","3","4","5","6","7","8","9","10","Page","Knight","Queen","King"];
        function constructSuit(suit){
            let oneSuit = ranks.map(rank => {
                let card = new TarotCard(suit, rank);
                return card;
            });
            return oneSuit;
        };
        this.coins = constructSuit("coins");
        this.wands = constructSuit("wands");
        this.swords = constructSuit("swords");
        this.cups = constructSuit("cups");
        let arcana = this.coins.concat(this.wands, this.swords, this.cups);
        this.minorArcana = arcana;
    };
//method2 //create major arcana
    this.createMajorArcana = function(){
        //major arcana: 22 unique cards
        const majorArcana = ["Fool", "Magician","High Priestess","Empress","Emperor","Hierophant","Lovers","Chariot","Strength","Hermit","Wheel of Fortune","Justice","Hanged Man","Death","Temperance","Devil","Tower","Star","Moon","Sun","Judgement","World"];
        function createMajorCards(){
            let majors = majorArcana.map((name, i) => {
                let card = new TarotCard(name, i);
                return card;
            });
            return majors;
        };
        this.majorArcana = createMajorCards();
    };
//method3 //create random number array for map function
    this.createShuffleMap = function() {
        let randNums = [];
        function getRandnums(max){
            return Math.floor(Math.random() * max);
        }
        function index52Arr() {
            for(let i = 0; i < 78; i++){
                let num = getRandnums(78);
                let breaker = false;
                for(let j = 0; j <= randNums.length; j++) {
                    if(randNums[j] === num) {
                        breaker = true;
                        i--;
                    } 
                }
                if(!breaker) {
                    randNums.push(num);
                }
            }
        
            return randNums;
        };
        
        return index52Arr();
    };
//method4: calls both card creation functions, concatenate those returned arrays, returns complete & sorted deck
    this.sortDeck = function() {
        //this can be called instead of shuffle to fill the deck - if one wanted a sorted deck
        this.createMinorArcana();
        this.createMajorArcana();
        let fullDeck = this.majorArcana.concat(this.minorArcana);
        return fullDeck;
    };
//method5: calls methods 3 and 4 to create and return shuffled deck 
    this.shuffle = function(){
        //calls sortt method so that major and minor arcana are created
        let sortedDeck = this.sortDeck();
        //creates an array of randomized numbers to map cards onto for shuffling mechanism
        let randomArr = this.createShuffleMap();
        //shuffles deck and returns it:
        let shuffledDeck = randomArr.map((e) => {
            return sortedDeck[e];
        });
        return shuffledDeck;
    };
}
let myDeck = new TarotDeck();

let fulllDeck = myDeck.sortDeck();
console.log("sorted deck? ",fulllDeck);

let shuffledDeck = myDeck.shuffle();
console.log("shuffled deck: ", shuffledDeck);
console.log("length: ", shuffledDeck.length);
