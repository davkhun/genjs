class General {
    constructor(name, age, skill) {
        this.Name = name;
        this.Age = age;
        this.Skill = skill;
        // мораль даёт небольшой буст общей морали армии если она выше чем мораль армии. Нулевая мораль - всегда дезертирство
        this.Morale = 100;
    }
}