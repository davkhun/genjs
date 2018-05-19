// маппинг для контролов
var _ScienceDict = {
    PopulationDensity: 'populationDensity',
    PopulationGrowth: 'populationGrowth',
    Agriculture: 'agriculture',
    MoneySystem: 'moneySystem',
    ArmyPower: 'armyPower',
    ScienceLevel: 'scienceLevel'
};

class Science {
    constructor() {
        this.PopulationDensity = 1.0;
        this.PopulationGrowth = 3.0;
        this.Agriculture = 2.0;
        this.MoneySystem = 10.0;
        this.ArmyPower = 1.0;
        this.ScienceLevel = 1.0;
        // сложность исследования
        this.PopulationDensityDifficulty = 0;
        this.PopulationGrowthDifficulty = 0;
        this.AgricultureDifficulty = 0;
        this.MoneySystemDifficulty = 0;
        this.ArmyPowerDifficulty = 0;
        this.ScienceLevelDifficulty = 0;
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

    // рассчет текущего прогресса в зависимости от количества ученых и сложности исследования
    getCurrentScienceProgress(science) {
        switch (science) {
            case _ScienceDict.PopulationDensity:
                return this.PopulationDensityScientists * (this.ScienceLevel - this.PopulationDensityDifficulty);
            case _ScienceDict.PopulationGrowth:
                return this.PopulationGrowthScientists * (this.ScienceLevel - this.PopulationGrowthDifficulty);
            case _ScienceDict.Agriculture:
                return this.AgricultureScientists * (this.ScienceLevel - this.AgricultureDifficulty);
            case _ScienceDict.MoneySystem:
                return this.MoneySystemScientists * (this.ScienceLevel - this.MoneySystemDifficulty);
            case _ScienceDict.ArmyPower:
                return this.ArmyPowerScientists * (this.ScienceLevel - this.ArmyPowerDifficulty);
            case _ScienceDict.ScienceLevel:
                return this.ScienceLevelScientists * (this.ScienceLevel - this.ScienceLevelDifficulty);
        }
    }

    // рассчет общего прогресса (для прогрессбара)
    getScienceProgress(science) {
        let overallProgress = 0;
        switch (science) {
            case _ScienceDict.PopulationDensity:
                overallProgress = this.PopulationDensityOverallProgress;
                break;
            case _ScienceDict.PopulationGrowth:
                overallProgress = this.PopulationGrowthOverallProgress;
                break;
            case _ScienceDict.Agriculture:
                overallProgress = this.AgricultureOverallProgress;
                break;
            case _ScienceDict.MoneySystem:
                overallProgress = this.MoneySystemOverallProgress;
                break;
            case _ScienceDict.ArmyPower:
                overallProgress = this.ArmyPowerOverallProgress;
                break;
            case _ScienceDict.ScienceLevel:
                overallProgress = this.ScienceLevelOverallProgress;
                break;
        }
        return overallProgress + getCurrentScienceProgress(science);
    }

    // рассчет оставшегося количества лет для исследования (текущий прогресс + имеющийся)
    getEstimatedResearchTime(science) {
        let overallProgress = 0;
        switch (science) {
            case _ScienceDict.PopulationDensity:
                overallProgress = this.PopulationDensityOverallProgress;
                break;
            case _ScienceDict.PopulationGrowth:
                overallProgress = this.PopulationGrowthOverallProgress;
                break;
            case _ScienceDict.Agriculture:
                overallProgress = this.AgricultureOverallProgress;
                break;
            case _ScienceDict.MoneySystem:
                overallProgress = this.MoneySystemOverallProgress;
                break;
            case _ScienceDict.ArmyPower:
                overallProgress = this.ArmyPowerOverallProgress;
                break;
            case _ScienceDict.ScienceLevel:
                overallProgress = this.ScienceLevelOverallProgress;
                break;
        }
        // если учёных нет, то и прогресс стоит на месте
        // иначе, получаем остаток от прогресса и делим на текущую производительность
        return this.getScienceProgress(science) == 0 ? -1 : Math.round((100 - overallProgress) / this.getScienceProgress(science));
    }

    // установка прогресса по науке
    setProgress(science) {
        const difficulty = getRandomFloat(0.03, 0.05);
        switch (science) {
            case _ScienceDict.PopulationDensity:
                this.PopulationDensityOverallProgress += getCurrentScienceProgress(science);
                // если исследовали, увеличим уровень
                if (this.PopulationDensityOverallProgress >= 100) {
                    const levelUp = getRandomFloat(0.10, 0.19);
                    this.PopulationDensity += levelUp;
                    this.PopulationDensityDifficulty += difficulty;
                    this.PopulationDensityOverallProgress = 0;
                }
                break;
            case _ScienceDict.PopulationGrowth:
                this.PopulationGrowthOverallProgress += getCurrentScienceProgress(science);
                if (this.PopulationGrowthOverallProgress >= 100) {
                    const levelUp = getRandomFloat(1.0, 1.20);
                    this.PopulationGrowth += levelUp;
                    this.PopulationGrowthDifficulty += difficulty;
                    this.PopulationGrowthOverallProgress = 0;
                }
                break;
            case _ScienceDict.Agriculture:
                this.AgricultureOverallProgress += getCurrentScienceProgress(science);
                if (this.AgricultureOverallProgress >= 100) {
                    const levelUp = getRandomFloat(1.0, 1.20);
                    this.Agriculture += levelUp;
                    this.AgricultureDifficulty += levelUp;
                    this.AgricultureOverallProgress = 0;
                }
                break;
            case _ScienceDict.MoneySystem:
                this.MoneySystemOverallProgress += getCurrentScienceProgress(science);
                if (this.MoneySystemOverallProgress >= 100) {
                    const levelUp = getRandomFloat(2.0, 2.20);
                    this.MoneySystem += levelUp;
                    this.MoneySystemDifficulty += difficulty;
                    this.MoneySystemOverallProgress = 0;
                }
                break;
            case _ScienceDict.ArmyPower:
                this.ArmyPowerOverallProgress += getCurrentScienceProgress(science);
                if (this.ArmyPowerOverallProgress >= 100) {
                    const levelUp = getRandomFloat(0.20, 0.29);
                    this.ArmyPower += levelUp;
                    this.ArmyPowerDifficulty += difficulty;
                    this.ArmyPowerOverallProgress = 0;
                }
                break;
            case _ScienceDict.ScienceLevel:
                this.ScienceLevelOverallProgress += getCurrentScienceProgress(science);
                if (this.ScienceLevelOverallProgress >= 100) {
                    const levelUp = getRandomFloat(0.20, 0.29);
                    this.ScienceLevel += levelUp;
                    this.ScienceLevelDifficulty += difficulty;
                    this.ScienceLevelOverallProgress = 0;
                }
                break;
        }
    }

    // массовое обновления прогресса по науке (для ежегодного пересчета)
    massSetProgress() {
        this.setProgress(_ScienceDict.PopulationDensity);
        this.setProgress(_ScienceDict.PopulationGrowth);
        this.setProgress(_ScienceDict.Agriculture);
        this.setProgress(_ScienceDict.MoneySystem);
        this.setProgress(_ScienceDict.ArmyPower);
        this.setProgress(_ScienceDict.ScienceLevel);
    }
}