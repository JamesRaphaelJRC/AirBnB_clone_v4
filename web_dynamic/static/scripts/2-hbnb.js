$('document').ready(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/',
    function (response) {
      if (response.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    });

  const selectedAmenities = {};

  $('INPUT[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).prop('checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }
    console.log(selectedAmenities);
    $('.amenities H4').text(Object.values(selectedAmenities).join(', '));
  });
});
