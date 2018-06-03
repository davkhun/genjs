class Country {
    constructor() {
        this.MaxPopulation = 1000;
        this.Area = 10;
        this.Grain = 50;
        // засеянное зерно
        this.SownGrain = 0;
        this.Money = 1000;
        this.Population = 500;
        this.Scientists = new Scientists();
        this.Soldiers = new Soldiers();
        this.FreePopulation = this.Population - this.Scientists.Amount - this.Soldiers.Amount;
        this.Science = new Science();
        // константа на покупку зерна
        this.BuyGrainConstant = this.Science.MoneySystem * 2;
    }

    getFullPopulation() {
        return this.FreePopulation + this.Scientists.Amount + this.Soldiers.Amount;
    }

    // ---------- Агрономика
    // вычисление максимально возможного количества засеянного зерна
    getMaxGrainForSeeding() {
        const maxTerritoryForGrain = Math.round(this.Area / 2);
        let maxGrain = this.FreePopulation;
        if (this.FreePopulation > this.Grain)
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
    sellGrain(value) {
        this.Grain -= value;
        this.Money += Math.round(value * this.Science.MoneySystem);
    }

    // покупка зерна
    buyGrain(value) {
        this.Grain += value;
        this.Money -= Math.round(value * this.BuyGrainConstant);
    }
    // --------------------------


    // ----- Учёные

    // стоимость нанятых
    getHiredScientistCosts() {
        return Math.round(this.Scientists.Amount * this.Scientists.Salary);
    }

    // максимальное количество от населения
    getMaxScientists() {
        return Math.round(this.FreePopulation * this.Scientists.PercentFromPopulation);
    }

    // максимальная стоимость найма
    getMaxScientistCosts() {
        const maxScientists = this.getMaxScientists();
        return maxScientists * this.Scientists.HireCost > this.Money ? 
            Math.round(Math.floor(this.Money / this.Scientists.HireCost) * this.Scientists.HireCost) : 
            maxScientists * this.Scientists.HireCost;
    }

    // максимальное количество для найма
    getMaxScientistsAvailable() {
        const maxScientists = this.getMaxScientists();
        return maxScientists * this.Scientists.HireCost > this.Money ? 
            Math.round(this.Money / this.Scientists.HireCost) : 
            maxScientists;
    }

    // рассчет стоимости произвольного количества
    calculateScientistCost(value) {
        return value * this.Scientists.HireCost;
    }

    // найм
    hireScientists(value) {
        this.FreePopulation -= value;
        this.Scientists.Amount += value;
        this.Money -= this.calculateScientistCost(value);
    }

    // увольнение
    dismissScientists(value) {
        this.FreePopulation += value;
        this.Scientists.Amount -= value;
    }
    // ------------

    // -------- Армия
    getHiredSoldierCosts() {
        return Math.round(this.Soldiers.Amount * this.Soldiers.Salary);
    }

    getMaxSoldiers() {
        return Math.round(this.FreePopulation * this.Soldiers.PercentFromPopulation);
    }

    // максимальная стоимость найма
    getMaxSoldiersCosts() {
        const maxSoldiers = this.getMaxSoldiers();
        return maxSoldiers * this.Soldiers.HireCost > this.Money ? 
            Math.round(Math.floor(this.Money / this.Soldiers.HireCost) * this.Soldiers.HireCost) : 
            maxSoldiers * this.Soldiers.HireCost;
    }

    // максимальное количество для найма
    getMaxSoldiersAvailable() {
        const maxSoldiers = this.getMaxSoldiers();
        return maxSoldiers * this.Soldiers.HireCost > this.Money ? 
            Math.round(this.Money / this.Soldiers.HireCost) : 
            maxSoldiers;
    }

    // рассчет стоимости произвольного количества
    calculateSoldierCost(value) {
        return value * this.Soldiers.HireCost;
    }

    // найм
    hireSoldier(value) {
        this.FreePopulation -= value;
        this.Soldiers.Amount += value;
        this.Money -= this.calculateSoldierCost(value);
    }

    // увольнение
    dismissSoldiers(value) {
        this.FreePopulation += value;
        this.Soldiers.Amount -= value;
    }

    // -------------


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

    // обработка хода
    nextYear() {
        // выдаём зарплаты
        this.Money -= this.getHiredScientistCosts();
        this.Money -= this.getHiredSoldierCosts();
        // приростаем населением
        this.Population += this.getPopulationGrowth();
        // выращиваем зерно
        this.Grain += this.getSownGrain();
        this.SownGrain = 0;
        // тащим науку
        this.Science.massSetProgress();
    }
}