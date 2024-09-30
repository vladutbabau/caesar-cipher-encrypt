function apasaButon(){

  // Selectam cu jQuery ' $ = querySelector("") ' continutul si ii adaugam clasa apasare-buton
  // Din style.css si functia fadeToggle() pentru a crea efectul de inchidere
  $(".container").addClass("apasare-buton");
  $(".container").fadeToggle();
  setTimeout(() => {
      $(".container").removeClass("apasare-buton");
  }, "200");
  
  setTimeout(() => {
    $(".container").fadeToggle();
  }, "1000")

  audio = new Audio("./sunete/wrong.mp3");
  audio.play();
}

$('.turn').on("click", apasaButon);

