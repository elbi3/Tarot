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
//method1
    this.createMinorArcana = function(){
        //minor arcana:
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
//method2
    this.createMajorArcana = function(){
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
//method3
    this.shuffle = function(){
        this.createMinorArcana();
        this.createMajorArcana();
        //if create methods have not been called, call them here?
        //possibly refactor so that shuffle calls other methods as well so only one method is needed for card instantiation inside the deck 
        //combines major and minor arcana into a full deck
        let fullDeck = this.majorArcana.concat(this.minorArcana);
        console.log("fullDeck? ", fullDeck);
        //shuffles cards
    }

}
let myDeck = new TarotDeck();
// myDeck.createMinorArcana();
// myDeck.createMajorArcana();
myDeck.shuffle();
// console.log("arcana: ", myDeck.coins);
// console.log("major arcana? ", myDeck.majorArcana);