// Base image url config
var iiifUrlBase = "";
var iiifUrlTail = "full/843,/0/default.jpg";

window.onload = function() {
    getArtworks();
};

/*
  Get Response
*/
function getArtworks() {
  var randomPage = Math.floor(Math.random() * 500);
  fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPage}&fields=title,thumbnail,image_id`)
    .then((response) => response.json())
    .then((json) => handleArtworks(json));
}

/*
  Handle Response
*/
function handleArtworks(artworks) {
  // Setup image base from config
  iiifUrlBase = artworks.config.iiif_url;
  
  // Get random image from array of images
  let randomIndex = Math.floor(Math.random() * (artworks.data.length - 1));
  let img = makeImage(artworks.data[randomIndex]);
  let description = document.createElement("p");

  // Attach the image
  let img_div = document.querySelector("#art");
  img_div.appendChild(img);

  // Attach title and description
  let description_div = document.querySelector("#description");
  description.innerHTML += `${img.alt}`;
  description_div.appendChild(description);
}

/*
  Image constructor
*/
function makeImage(artwork) {
  removeImage();
  removeDescription();
  // Make the image element with document.createElement
  let img = document.createElement("img");
  
  // Set some properties
  img.id = artwork.image_id;
  img.width = artwork.thumbnail.width;
  img.height = artwork.thumbnail.height;
  img.alt = `${artwork.title} | ${artwork.thumbnail.alt_text}`;
  
  // Set the src
  // Construct using the base, the image_id, and some default options
  img.src = `${iiifUrlBase}/${artwork.image_id}/${iiifUrlTail}`;
  
  // return image
  return img;
}

function removeImage() {
  var img = document.querySelector("img");
  
  if (img) {
    img.remove();
  }
}

function removeDescription() {
    var description = document.querySelector("p");
    
    if(description) {
        description.remove();
    }
}

/*
  Wire it up
*/
document.querySelector("button").addEventListener("click", getArtworks);