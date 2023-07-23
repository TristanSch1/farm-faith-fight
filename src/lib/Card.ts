enum EDomaine {
    ARMY = 'ARMY',
    RELIGION = 'RELIGION',
    TRADE = 'TRADE'
}

class Card {
    description: string;
    name: string;


    constructor(description: string, name: string) {
        this.description = description;
        this.name = name
    }

}