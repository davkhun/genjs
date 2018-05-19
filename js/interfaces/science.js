    // настройка контроллов для модального окна науки
    function populateScienceModal() {
        populateScienceLabels();
        populateScienceInput();
        populateScienceProgressBar();
        $('#scienceModal').modal('show');
      }


      // настройка заголовков
      function populateScienceLabels() {
        $('span[name=scienceLabel]').each(function(i,item){ 
          const science = $(item).attr('data-id');
          $(item).text(_User.Science.getScienceLevel(science));
        });
    }

      // настройка инпутов 
      function populateScienceInput(){
        // выставляем количество занятых на текущий момент ученых 
        $('input[name=scienceInput]').each(function (i, item) {
            const science = $(item).attr('data-id');
            $(item).val(_User.Science.getScientists(science));
          });
      }

      // настройка прогресс бара
      function populateScienceProgressBar() {
          $('div[name=scienceProgress]').each(function (i, item) {
            const science = $(item).attr('data-id');
            const value = _User.Science.getScienceProgress(science);
            $(item).css('width', value+'%').attr('aria-valuenow', value);  
            $(`span[data-id=${science}]`).text(`${value}%`);  
          });
      }