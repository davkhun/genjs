    // настройка контроллов для модального окна науки
    function populateScienceModal() {
        populateScienceLabels();
        populateScienceInput();
        populateScienceProgressBar();
        $('#scienceModal').modal('show');
      }


      // настройка заголовков
      function populateScienceLabels() {
        $('label[name=scienceLabel]').each(function(i,item){ 
          const science = $(item).attr('data-id');
          switch (science) {
              case 'populationDensity':
                  $(item).text(`Плотность населения: ${_User.Science.PopulationDensity}`);
              break;
          }
        });
    }

      // настройка инпутов 
      function populateScienceInput(){
        // выставляем количество занятых на текущий момент ученых 
        $('input[name=scienceInput]').each(function (i, item) {
            const science = $(item).attr('data-id');
            switch (science) {
              case 'populationDensity':
                $(item).val(_User.Science.PopulationDensityScientists);
              break;
            }
          });
      }

      // настройка прогресс бара
      function populateScienceProgressBar() {
          $('div[name=scienceProgress]').each(function (i, item) {
            const science = $(item).attr('data-id');
            let value = 0;
            switch (science) {
                case 'populationDensity':
                    value = _User.Science.PopulationDensityProgress;
                break;
            }
            $(item).css('width', value+'%').attr('aria-valuenow', value);  
            $(`span[data-id=${science}]`).text(`${value}%`);  
          });
      }