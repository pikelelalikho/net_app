// Image popup modal for badges
let fullImgBox = document.getElementById("fullImgBox");
let fullImg = document.getElementById("fullImg");
let imgDesc = document.getElementById("imgDesc");

function openFullImg(src, desc) {
  fullImgBox.style.display = "flex";
  fullImg.src = src;
  imgDesc.innerText = desc;
}

function closeFullImg() {
  fullImgBox.style.display = "none";
}