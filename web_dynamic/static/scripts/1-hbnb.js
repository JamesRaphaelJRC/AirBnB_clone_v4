$(document).ready(function () {
    let selectedAmenities = {};

    $('INPUT[type="checkbox"]').change(function () {
        var amenityId = $(this).attr("data-id");
        var amenityName = $(this).attr("data-name");

        if ($(this).prop("checked")) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }
        console.log(selectedAmenities)
        $(".amenities H4").text(Object.values(selectedAmenities).join(', '))
    });
});
