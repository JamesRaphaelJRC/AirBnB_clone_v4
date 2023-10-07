$(document).ready(function () {
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
