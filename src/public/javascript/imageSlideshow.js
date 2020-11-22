var slideIndex = 0;
autoSlide();

function autoSlide(){
    // get all images
    let images = document.getElementsByClassName("destImageSlideshow");
    let dots = document.getElementsByClassName("dot");

    for(let imageIndex = 0; imageIndex < images.length; imageIndex++){
        images[imageIndex].style.display = "none"; // hide all images
    }

    slideIndex++;
    if(slideIndex > images.length) // condition for the last image
        slideIndex = 1; // reset slideIndex to the index of the first image

    for (let dotIndex = 0; dotIndex < dots.length; dotIndex++) {
        dots[dotIndex].className = dots[dotIndex].className.replace(" active", "");
    }
    // else, show the image at (slideIndex - 1)
    images[slideIndex-1].style.display = "block"; // show image

    setTimeout(autoSlide, 2000); // set time for image will change after 2000 milliseconds
}
