class Science {
    constructor() {
        this.PopulationDensity = 1.0;
        this.PopulationGrowth = 3.0;
        this.Agriculture = 2.0;
        this.MoneySystem = 10.0;
        this.ArmyPower = 1.0;
        this.ScienceLevel = 1.0;
        // количество учёных на каждом направлении
        this.PopulationDensityScientists = 0;
        this.PopulationGrowthScientists = 0;
        this.AgricultureScientists = 0;
        this.MoneySystemScientists = 0;
        this.ArmyPowerScientists = 0;
        this.ScienceLevelScientists = 0;
        // прогресс по каждому направлению
        this.PopulationDensityOverallProgress = 0;
        this.PopulationGrowthOverallProgress = 0;
        this.AgricultureOverallProgress = 0;
        this.MoneySystemOverallProgress = 0;
        this.ArmyPowerOverallProgress = 0;
        this.ScienceLevelOverallProgress = 0;
    }

    // рассчет текущего прогресса в зависимости от количества ученых
    getScienceProgress(science) {
        switch (science) {
            case 'populationDensity':
                return this.PopulationDensityScientists * this.ScienceLevel;
            case 'populationGrowth':
                return this.PopulationGrowthScientists * this.ScienceLevel;
            case 'agriculture':
                return this.AgricultureScientists * this.ScienceLevel;
            case 'moneySystem':
                return this.MoneySystemScientists * this.ScienceLevel;
            case 'armyPower':
                return this.ArmyPowerScientists * this.ScienceLevel;
            case 'scienceLevel':
                return this.ScienceLevelScientists * this.ScienceLevel;
        }
    }

    // вычисление оставшегося прогресса
    getRemainingProgress(science) {
        switch (science) {
            case 'populationDensity':
                return 100 - this.PopulationDensityOverallProgress;
            case 'populationGrowth':
                return 100 - this.PopulationDensityOverallProgress;
            case 'agriculture':
                return 100 - this.PopulationDensityOverallProgress;
            case 'moneySystem':
                return 100 - this.PopulationDensityOverallProgress;
            case 'armyPower':
                return 100 - this.PopulationDensityOverallProgress;
            case 'scienceLevel':
                return 100 - this.PopulationDensityOverallProgress;
        }
    }

    // рассчет оставшегося количества лет для исследования (текущий прогресс + имеющийся)
    getEstimatedResearchTime(science) {
        let overallProgress = 0;
        switch (science) {
            case 'populationDensity':
                overallProgress = this.PopulationDensityOverallProgress;
                break;
            case 'populationGrowth':
                overallProgress = this.PopulationGrowthOverallProgress;
                break;
            case 'agriculture':
                overallProgress = this.AgricultureOverallProgress;
                break;
            case 'moneySystem':
                overallProgress = this.MoneySystemOverallProgress;
                break;
            case 'armyPower':
                overallProgress = this.ArmyPowerOverallProgress;
                break;
            case 'scienceLevel':
                overallProgress = this.ScienceLevelOverallProgress;
                break;
        }
        return Math.round(100 / (this.getScienceProgress(science)) + overallProgress);
    }

    // установка прогресса по науке
    setProgress(science) {
        switch (science) {
            case 'populationDensity':
                this.PopulationDensityOverallProgress += getScienceProgress(science);
                break;
            case 'populationGrowth':
                this.PopulationGrowthOverallProgress += getScienceProgress(science);
                break;
            case 'agriculture':
                this.AgricultureOverallProgress += getScienceProgress(science);
                break;
            case 'moneySystem':
                this.MoneySystemOverallProgress += getScienceProgress(science);
                break;
            case 'armyPower':
                this.ArmyPowerOverallProgress += getScienceProgress(science);
                break;
            case 'scienceLevel':
                this.ScienceLevelOverallProgress += getScienceProgress(science);
                break;
        }
    }

    // массовое обновления прогресса по науке (для ежегодного пересчета)
    massSetProgress() {
        this.setProgress('populationDensity');
        this.setProgress('populationGrowth');
        this.setProgress('agriculture');
        this.setProgress('moneySystem');
        this.setProgress('armyPower');
        this.setProgress('scienceLevel');
    }
}