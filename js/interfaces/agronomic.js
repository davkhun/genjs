    // инициализация агрономных слайдеров
    function populateAgronomicSlider() {
        $('#grainInput').slider({
          min: 0,
          max: _User.getMaxGrainForSeeding(),
          value: 0
        });
        $('#grainInput').slider('refresh');
        $('#grainSellInput').slider({
          min: 0,
          max: _User.Grain,
          value: 0
        });
        $('#grainSellInput').slider('refresh');
        $('#grainBuyInput').slider({
          min: 0,
          max: _User.getMaxGrainForBuying(),
          value: 0
        });
        $('#grainBuyInput').slider('refresh');
      }
  
      // засев зерна
      function populateGrainActions() {
        const slider = $('#grainInput').slider();
        $('#setMaxGrainBtn').on('click', function () {
          slider.slider('setValue', _User.getMaxGrainForSeeding());
        });
  
        $('#applyGrainBtn').on('click', function () {
          const value = slider.slider('getValue');
          // сажаем зерно
          _User.sownGrain(value);
          populateAgronomicSlider();
          populateHeader();
        });
      }
  
      // продажа зерна
      function populateGrainSellActions() {
        const slider = $('#grainSellInput').slider();
        $('#setMaxGrainSellBtn').on('click', function () {
          slider.slider('setValue', _User.Grain);
        });
  
        $('#applySellGrainBtn').on('click', function () {
          const value = slider.slider('getValue');
          // продаем зерно
          _User.sellGrain(value);
          populateAgronomicSlider();
          populateHeader();
        });
      }
  
      // покупка зерна
      function populateGrainBuyActions() {
        const slider = $('#grainBuyInput').slider();
  
        $('#setMaxGrainBuyBtn').on('click', function () {
          slider.slider('setValue', _User.getMaxGrainForBuying());
        });
  
        $('#applyBuyGrainBtn').on('click', function () {
          const value = slider.slider('getValue');
          // покупаем зерно
          _User.buyGrain(value);
          populateAgronomicSlider();
          populateHeader();
        });
      }

      // сразу засеять и продать всё зерно
      $('#allGrainActionsBtn').on('click',function () {
          // максимум засеиваем
          $('#setMaxGrainBtn').click();
          $('#applyGrainBtn').click();
          // максимум продаем
          $('#setMaxGrainSellBtn').click();
          $('#applySellGrainBtn').click();
          // обновляем 
          populateAgronomicSlider();
          populateHeader();
      });