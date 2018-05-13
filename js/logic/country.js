class Country {
    constructor() {
        this.MaxPopulation = 1000;
        this.Area = 10;
        this.Grain = 50;
        // засеянное зерно
        this.SownGrain = 0;
        this.Money = 1000;
        this.Population = 500;
        this.Scientists = 0;
        this.Soldiers = 0;
        this.Science = new Science();
        // константа на покупку зерна
        this.BuyGrainConstant = this.Science.MoneySystem * 2;
    } 

// ---------- Агрономика
    // вычисление максимально возможного количества засеянного зерна
    getMaxGrainForSeeding() {
        const currentPopulation = this.getFreePopulation();
        const maxTerritoryForGrain = Math.round(this.Area / 2);
        let maxGrain = currentPopulation;
        if (currentPopulation > this.Grain)
            maxGrain = this.Grain;
        if (maxTerritoryForGrain < maxGrain)
            maxGrain = maxTerritoryForGrain;
        return maxGrain - this.SownGrain;
    }

    // вычисление максимального количества зерна для покупки
    getMaxGrainForBuying() {
        return Math.ceil(this.Money / this.BuyGrainConstant);
    }

    // засев зерна
    sownGrain(value) {
        if (value > this.getMaxGrainForSeeding())
            return 0;
        this.SownGrain += value;
        this.Grain -= value;
    }

    // количество выращенного зерна
    getSownGrain() {
        return Math.round(this.SownGrain * this.Science.Agriculture);
    }

    // продажа зерна
    sellGrain(value){
        this.Grain -= value;
        this.Money += Math.round(value * this.Science.MoneySystem);
    }

    // покупка зерна
    buyGrain(value) {
        this.Grain += value;
        this.Money -= Math.round(value * this.BuyGrainConstant);
    }

    

// --------------------------

    getFreePopulation() {
        return this.Population - this.Scientists - this.Soldiers;
    }

    getScientistCosts() {
        return Math.round(this.Scientists * 10);
    }

    getSoldierCosts() {
        return Math.round(this.Soldiers * 5);
    }

    // вычисление прироста населения
    getPopulationGrowth() {
        if (this.Population >= this.MaxPopulation)
            return 0;
        if (this.Area * this.Science.PopulationDensity < this.Population)
            return 0;
        // базовая величина = 5% от числа населения * уровень плотности
        const baseGrowth = 0.05 * this.Population * this.Science.PopulationDensity;
        return Math.round(baseGrowth);
    }


}