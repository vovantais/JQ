$(function () {
   $('.cars-color__item').on('click', function () {
      let imgAtrr = $(this).attr('data-img');
      $('.cars img').attr("src", imgAtrr);
   })
   function CalculatePrise() {
      let praisEngine = $('.avto-settings__engine input[name=engine]:checked').val();
      let praisTransmission = $('.avto-settings__transmission input[name=transmission]:checked').val();
      let praisVersion = $('.avto-settings__version input[name=version]:checked').val();
      let tottal = eval(praisEngine) + eval(praisTransmission) + eval(praisVersion);
      $('.avto-info__praisBYN').text(tottal + ' BYN ');

      let url = ' https://www.nbrb.by/api/exrates/rates?periodicity=0';
      let prom = fetch(url)
         .then(res => res.json())
         .then(obj => readFetch(obj[4].Cur_OfficialRate));
      function readFetch(USD) {
         let Curss = Math.trunc(tottal / USD);
         $('.avto-info__praisUSD').text(Curss + ' USD')
      }
   }
   function ChangePrais() {
      $('.avto-settings__body input').on('change', function () {
         CalculatePrise();
         TextSpan();
      });
   }
   ChangePrais();

   CalculatePrise();

   function TextSpan() {
      let TextEngine = $('.avto-settings__engine input[name=engine]:checked + span').text();
      let TextTransmission = $('.avto-settings__transmission input[name=transmission]:checked + span').text();
      let TextVersion = $('.avto-settings__version input[name=version]:checked + span').text();
      let TextTottal = TextEngine + ", " + TextTransmission + ", " + TextVersion;
      $('.avto-info__infomation').text(TextTottal)
   }
   TextSpan();

});
