var _timeoutId;
// настройка контроллов для модального окна науки
function populateScienceModal() {
    populateScienceLabels();
    populateScienceInput();
    populateScienceProgressBar();
    populateEstimatedYears();

    $('#scienceModal').modal('show');
}


// настройка заголовков
function populateScienceLabels() {
    $('label[name=scienceLabel]').each(function (i, item) {
        const science = $(item).attr('data-id');
        $(item).find('span').text(_User.Science.getScienceLevel(science));
    });
}

// настройка инпутов 
function populateScienceInput() {
    // выставляем количество занятых на текущий момент ученых 
    $('input[name=scienceInput]').each(function (i, item) {
        const science = $(item).attr('data-id');
        $(item).val(_User.Science.getBusyScientists(science));
    });
}

// настройка прогресс бара
function populateScienceProgressBar() {
    $('div[name=scienceProgress]').each(function (i, item) {
        const science = $(item).attr('data-id');
        const value = _User.Science.getScienceProgress(science);
        $(item).css('width', value + '%').attr('aria-valuenow', value);
        $(`span[data-id=${science}]`).text(`${value}%`);
    });
}

// настройка оставшегося времени в годах
function populateEstimatedYears() {
    $('small[name=scienceEstimatedSmall]').each(function (i, item) {
        const science = $(item).attr('data-id');
        const estimatedTime = _User.Science.getEstimatedResearchTime(science);
        $(item).text(`Откроют в течение: ${estimatedTime == -1 ? 'не исследуется' : estimatedTime}`);
    });
}

// добавление или удаление ученых из проекта
function setScientist(science, amount) {
    const freeScientists = _User.Scientists.Amount - _User.Science.getAllBusyScientists();
    const busyScientists = _User.Science.getBusyScientists(science);
    if (busyScientists == 0 && amount < 0)
        return;
    if (freeScientists > 0 || amount < 0) {
        // получаем количество учёных над проектом и добавляем им необходимое число
        const newScientists = busyScientists + amount;
        $(`input[data-id=${science}]`).val(newScientists);
        _User.Science.setScientists(science, amount);
        populateScienceProgressBar();
        populateEstimatedYears();
    }
}

// настройка кнопок максимального кол-ва учёных
function populateMaxScientistsBtn() {
    $('button[name=scienceSetMax]').on('click', function () {
        const science = $(this).attr('data-id');
        const freeScientists = _User.Scientists.Amount - _User.Science.getAllBusyScientists();
        setScientist(science, freeScientists);
    });
}

// настройка кнопок снятия всех ученых
function populateZeroScientistsBtn() {
    $('button[name=scienceSetZero]').on('click', function () {
        const science = $(this).attr('data-id');
        const needToFreeScientists = _User.Science.getBusyScientists(science) * (-1);
        setScientist(science, needToFreeScientists);
    });
}

// настройка добавления ученых в проект
function populateIncreaseScientists() {
    $('button[name=scienceSetIncrease]').on('mousedown', function () {
        const science = $(this).attr('data-id');
        setScientist(science, 1);
        _timeoutId = setInterval(function () {
            setScientist(science, 1);
        }, 20);
    }).bind('mouseup mouseleave', function () {
        clearInterval(_timeoutId);
    });

}

function populateDecreaseScientists() {
    $('button[name=scienceSetDecrease]').on('mousedown', function () {
        const science = $(this).attr('data-id');
        setScientist(science, -1);
        _timeoutId = setInterval(function () {
            setScientist(science, -1);
        }, 20);
    }).bind('mouseup mouseleave', function () {
        clearInterval(_timeoutId);
    });
}

// настройка кнопок учёных на один год
function populateScientistsForOneYear() {
    $('button[name=scienceSet1Yr]').on('click', function () {
        const science = $(this).attr('data-id');
        const freeScientists = _User.Scientists.Amount - _User.Science.getAllBusyScientists();
        const scientistsNeed = _User.Science.getScientistsForOneYear(science, freeScientists);
        if (scientistsNeed > 0)
            setScientist(science, scientistsNeed);
    });
}
