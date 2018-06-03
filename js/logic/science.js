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
        this.PopulationDensityDifficulty = 1;
        this.PopulationGrowthDifficulty = 1;
        this.AgricultureDifficulty = 1;
        this.MoneySystemDifficulty = 1;
        this.ArmyPowerDifficulty = 1;
        this.ScienceLevelDifficulty = 1;
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

    // получение количества учёных занятых над проектом
    getBusyScientists(science) {
        switch (science) {
            case _ScienceDict.PopulationDensity:
                return this.PopulationDensityScientists;
            case _ScienceDict.PopulationGrowth:
                return this.PopulationGrowthScientists;
            case _ScienceDict.Agriculture:
                return this.AgricultureScientists;
            case _ScienceDict.MoneySystem:
                return this.MoneySystemScientists;
            case _ScienceDict.ArmyPower:
                return this.ArmyPowerScientists;
            case _ScienceDict.ScienceLevel:
                return this.ScienceLevelScientists;
        }
    }

    // максимальное количество занятых ученых
    getAllBusyScientists() {
        return this.PopulationDensityScientists +
            this.PopulationGrowthScientists +
            this.AgricultureScientists +
            this.MoneySystemScientists +
            this.ArmyPowerScientists +
            this.ScienceLevelScientists;
    }

    // получение уровня развития
    getScienceLevel(science) {
        switch (science) {
            case _ScienceDict.PopulationDensity:
                return this.PopulationDensity;
            case _ScienceDict.PopulationGrowth:
                return this.PopulationGrowth;
            case _ScienceDict.Agriculture:
                return this.Agriculture;
            case _ScienceDict.MoneySystem:
                return this.MoneySystem;
            case _ScienceDict.ArmyPower:
                return this.ArmyPower;
            case _ScienceDict.ScienceLevel:
                return this.ScienceLevel;
        }
    }

    // рассчет текущего прогресса в зависимости от количества ученых и сложности исследования
    getCurrentScienceProgress(science) {
        const scientistsAmount = this.getBusyScientists(science);
        switch (science) {
            case _ScienceDict.PopulationDensity:
                return scientistsAmount * (this.ScienceLevel / this.PopulationDensityDifficulty);
            case _ScienceDict.PopulationGrowth:
                return scientistsAmount * (this.ScienceLevel / this.PopulationDensityDifficulty);
            case _ScienceDict.Agriculture:
                return scientistsAmount * (this.ScienceLevel / this.AgricultureDifficulty);
            case _ScienceDict.MoneySystem:
                return scientistsAmount * (this.ScienceLevel / this.MoneySystemDifficulty);
            case _ScienceDict.ArmyPower:
                return scientistsAmount * (this.ScienceLevel / this.ArmyPowerDifficulty);
            case _ScienceDict.ScienceLevel:
                return scientistsAmount * (this.ScienceLevel / this.ScienceLevelDifficulty);
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
        const result = overallProgress + this.getCurrentScienceProgress(science);

        return result > 100 ? 100 : Math.round(result * 10) / 10;
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
        return this.getScienceProgress(science) == 0 ? -1 : Math.ceil((100 - overallProgress) / this.getCurrentScienceProgress(science));
    }

    // установка прогресса по науке
    setProgress(science) {
        const difficulty = getRandomFloat(0.2, 0.4);
        switch (science) {
            case _ScienceDict.PopulationDensity:
                this.PopulationDensityOverallProgress += this.getCurrentScienceProgress(science);
                // если исследовали, увеличим уровень
                if (this.PopulationDensityOverallProgress >= 100) {
                    const levelUp = Math.round((getRandomFloat(0.10, 0.19) + 0.00001) * 100) / 100;
                    this.PopulationDensity += levelUp;
                    this.PopulationDensityDifficulty += difficulty;
                    this.PopulationDensityOverallProgress = 0;
                }
                break;
            case _ScienceDict.PopulationGrowth:
                this.PopulationGrowthOverallProgress += this.getCurrentScienceProgress(science);
                if (this.PopulationGrowthOverallProgress >= 100) {
                    const levelUp = Math.round((getRandomFloat(1.0, 1.20) + 0.00001) * 100) / 100;
                    this.PopulationGrowth += levelUp;
                    this.PopulationGrowthDifficulty += difficulty;
                    this.PopulationGrowthOverallProgress = 0;
                }
                break;
            case _ScienceDict.Agriculture:
                this.AgricultureOverallProgress += this.getCurrentScienceProgress(science);
                if (this.AgricultureOverallProgress >= 100) {
                    const levelUp = Math.round((getRandomFloat(1.0, 1.20) + 0.00001) * 100) / 100;
                    this.Agriculture += levelUp;
                    this.AgricultureDifficulty += difficulty;
                    this.AgricultureOverallProgress = 0;
                }
                break;
            case _ScienceDict.MoneySystem:
                this.MoneySystemOverallProgress += this.getCurrentScienceProgress(science);
                if (this.MoneySystemOverallProgress >= 100) {
                    const levelUp = Math.round((getRandomFloat(2.0, 2.20) + 0.00001) * 100) / 100;
                    this.MoneySystem += levelUp;
                    this.MoneySystemDifficulty += difficulty;
                    this.MoneySystemOverallProgress = 0;
                }
                break;
            case _ScienceDict.ArmyPower:
                this.ArmyPowerOverallProgress += this.getCurrentScienceProgress(science);
                if (this.ArmyPowerOverallProgress >= 100) {
                    const levelUp = Math.round((getRandomFloat(0.20, 0.29) + 0.00001) * 100) / 100;
                    this.ArmyPower += levelUp;
                    this.ArmyPowerDifficulty += difficulty;
                    this.ArmyPowerOverallProgress = 0;
                }
                break;
            case _ScienceDict.ScienceLevel:
                this.ScienceLevelOverallProgress += this.getCurrentScienceProgress(science);
                if (this.ScienceLevelOverallProgress >= 100) {
                    const levelUp = Math.round((getRandomFloat(0.05, 0.1) + 0.00001) * 100) / 100;
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

    // вычисление количества учёных для исследования за один год
    getScientistsForOneYear(science, scientistsAvailable) {
        let scientistsNeed = 0;
        const remainingProgress = 100 - this.getScienceProgress(science);
        //вычисляем оставшийся прогресс и делим на учёный уровень, округляя
        switch (science) {
            case _ScienceDict.PopulationDensity:
                scientistsNeed = Math.ceil(remainingProgress / (this.ScienceLevel - this.PopulationDensityDifficulty));
                break;
            case _ScienceDict.PopulationGrowth:
                scientistsNeed = Math.ceil(remainingProgress / (this.ScienceLevel - this.PopulationGrowthDifficulty));
                break;
            case _ScienceDict.Agriculture:
                scientistsNeed = Math.ceil(remainingProgress / (this.ScienceLevel - this.AgricultureDifficulty));
                break;
            case _ScienceDict.MoneySystem:
                scientistsNeed = Math.ceil(remainingProgress / (this.ScienceLevel - this.MoneySystemDifficulty));
                break;
            case _ScienceDict.ArmyPower:
                scientistsNeed = Math.ceil(remainingProgress / (this.ScienceLevel - this.MoneySystemDifficulty));
                break;
            case _ScienceDict.ScienceLevel:
                scientistsNeed = Math.ceil(remainingProgress / (this.ScienceLevel - this.ScienceLevelDifficulty));
                break;
        }
        console.log(scientistsNeed);
        return scientistsNeed > scientistsAvailable ? 0 : scientistsNeed;
    }

    // назначение ученых
    setScientists(science, amount) {
        switch (science) {
            case _ScienceDict.PopulationDensity:
                this.PopulationDensityScientists += amount;
                break;
            case _ScienceDict.PopulationGrowth:
                this.PopulationGrowthScientists += amount;
                break;
            case _ScienceDict.Agriculture:
                this.AgricultureScientists += amount;
                break;
            case _ScienceDict.MoneySystem:
                this.MoneySystemScientists += amount;
                break;
            case _ScienceDict.ArmyPower:
                this.ArmyPowerScientists += amount;
                break;
            case _ScienceDict.ScienceLevel:
                this.ScienceLevelScientists += amount;
                break;
        }
    }
}