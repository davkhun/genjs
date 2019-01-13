var _ArmyDirection = {
    Defence: 0,
    Attack: 1
};

class Army {
    constructor(armyName, armySize, general) {
        this.Morale = 100;
        this.ArmyName = armyName;
        this.ArmySize = armySize;
        // объект генерала
        this.General = general;
        // по умолчанию в защите
        this.ArmyDirection = _ArmyDirection.Defence;
        // лет без сражений (мораль падает от 5 лет и дальше)
        this.YearsAfterBattle = 0;
    }
}