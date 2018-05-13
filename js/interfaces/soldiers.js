// инициализация слайдеров армии
function populateSoldierSlider() {
    $('#soldierHireInput').slider({
        min: 0,
        max: _User.getMaxSoldiersAvailable(),
        value: 0,
        formatter: function(value) {
            return `Количество: ${value} Стоимость: ${_User.calculateSoldierCost(value)}`;
        }
    });
    $('#soldierHireInput').slider('refresh');
    $('#soldierDismissInput').slider({
        min: 0,
        max: _User.Soldiers.Amount,
        value: 0
    });
    $('#soldierDismissInput').slider('refresh');
}

// найм и увольнение
function populateSoldiersHire() {
    const hireSlider = $('#soldierHireInput').slider();

    $('#setMaxSoldierHireBtn').on('click', function () {
        hireSlider.slider('setValue', _User.getMaxSoldiersAvailable());
    });

    $('#applyHireSoldierBtn').on('click', function () {
        const value = hireSlider.slider('getValue');
        // нанимаем ученых
        _User.hireSoldier(value);
        populateSoldierSlider();
        populateHeader();
    });
}

function populateSoldiersDismiss() {
    const dismissSlider = $('#soldierDismissInput').slider();

    $('#setMaxSoldierDismissBtn').on('click', function () {
        dismissSlider.slider('setValue', _User.Soldiers.Amount);
    });

    $('#applyDismissSoldierBtn').on('click', function () {
        const value = dismissSlider.slider('getValue');
        // увольняем ученых
        _User.dismissSoldiers(value);
        populateSoldierSlider();
        populateHeader();
    });
}
