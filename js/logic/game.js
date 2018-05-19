class Game {
    constructor(players){
        this.Players = players;
        this.Year = 0;
    }

    nextYear() {
        this.Year++;
        this.Players.forEach(item => {
            item.nextYear();
            console.log('Next: ', item);
        });
    }
}