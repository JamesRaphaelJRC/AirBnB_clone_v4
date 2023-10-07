$('document').ready(function () {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    dataType: 'json',
    success: appendPlaces
  });

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

  $('BUTTON').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(selectedAmenities) }),
      dataType: 'json',
      contentType: 'application/json',
      success: appendPlaces
    });
  });

  function appendPlaces (response) {
    for (let i = 0; i < response.length; i++) {
      const place = response[i];

      $('SECTION.places').append(`<ARTICLE>
              <DIV class="title">
                <H2>${place.name}</H2>
                <DIV class="price_by_night">
                  ${place.price_by_night}
                </DIV>
              </DIV>
              <DIV class="information">
                <DIV class="max_guest">
                  <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                  </BR>
                  ${place.max_guest} Guests
                </DIV>
                <DIV class="number_rooms">
                  <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                  </BR>
                  ${place.number_rooms} Bedrooms
                </DIV>
                <DIV class="number_bathrooms">
                  <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                  </BR>
                  ${place.number_bathrooms} Bathrooms
                </DIV>
              </DIV>
              <DIV class="description">
                ${place.description}
              </DIV>
            </ARTICLE>`);
    }
  }
});
