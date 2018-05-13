// инициализация научных слайдеров
function populateScientistSlider() {
    $('#scientistHireInput').slider({
        min: 0,
        max: _User.getMaxScientistsAvailable(),
        value: 0,
        formatter: function(value) {
            return `Количество: ${value} Стоимость: ${_User.calculateScientistCost(value)}`;
        }
    });
    $('#scientistHireInput').slider('refresh');
    $('#scientistDismissInput').slider({
        min: 0,
        max: _User.Scientists.Amount,
        value: 0
    });
    $('#scientistDismissInput').slider('refresh');
}

// найм и увольнение
function populateScientistsHire() {
    const hireSlider = $('#scientistHireInput').slider();

    $('#setMaxScientistHireBtn').on('click', function () {
        hireSlider.slider('setValue', _User.getMaxScientistsAvailable());
    });

    $('#applyHireScientistBtn').on('click', function () {
        const value = hireSlider.slider('getValue');
        // нанимаем ученых
        _User.hireScientists(value);
        populateScientistSlider();
        populateHeader();
    });
}

function populateScientistsDismiss() {
    const dismissSlider = $('#scientistDismissInput').slider();

    $('#setMaxScientistDismissBtn').on('click', function () {
        dismissSlider.slider('setValue', _User.Scientists.Amount);
    });

    $('#applyDismissScientistBtn').on('click', function () {
        const value = dismissSlider.slider('getValue');
        // увольняем ученых
        _User.dismissScientists(value);
        populateScientistSlider();
        populateHeader();
    });
}