// Slideshow
if (document.querySelector('.home') != null) {
  var slideIndex = 1;
  showMovies(slideIndex);
  setInterval(function () {
    slideIndex++;
    curMovies(slideIndex);
  }, 5000);
}

function plusSlides(n) {
  showMovies(slideIndex += n);
}

function curMovies(n) {
  showMovies(slideIndex = n);
}

function showMovies(n) {
  var i;
  var slides = document.querySelectorAll('.slide');
  var items = document.querySelectorAll('.m-item');
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) slides[i].className = slides[i].className.replace(' current', '');
  for (i = 0; i < items.length; i++) items[i].className = items[i].className.replace(' active', '');
  slides[slideIndex - 1].className += ' current';
  items[slideIndex - 1].className += ' active';
}

// Xác minh Form
function validateEmail(email) {
  var re = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
  return re.test(String(email).toLowerCase());
}

function validateForm() {
  var check = true;
  var fname = document.forms["formrequest"]["fname"].value,
    email = document.forms["formrequest"]["email"].value,
    moviename = document.forms["formrequest"]["moviename"].value,
    year = document.forms["formrequest"]["year"].value;
  if (fname == "" || fname == null) {
    alert("Họ tên không được để trống!!!");
    return check = false;
  } else if (email == "" || email == null) {
    alert("Email không được để trống!!!");
    return check = false;
  } else if (moviename == "" || moviename == null) {
    alert("Tên phim không được để trống!!!");
    return check = false;
  } else if (year == "" || year == null) {
    alert("Ngày sản xuất không được để trống!!!");
    return check = false;
  } else if (!validateEmail(email)) {
    alert("Email không đúng định dạng!!!");
    return check = false;
  } else if (isNaN(year)) {
    alert("Ngày sản xuất phải là dạng số!!!");
    return check = false;
  }
  return check
}

// Đồng hồ
function getTime() {
  var timer = new Date();
  var h = timer.getHours();
  var m = timer.getMinutes();
  var s = timer.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  clock.innerHTML = h + ":" + m + ":" + s;
  setTimeout(getTime, 500);

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i
    }
    return i;
  }
}
var clock = document.createElement("div");
clock.className = "clock";
if (document.querySelector('#widget') != null) {
  document.querySelector('#widget').appendChild(clock);
}
getTime();

//Menu cố định
if (document.querySelector('.home') != null) {
  var navbar = document.querySelector(".navbar");
  var sticky = navbar.offsetTop;
  window.onscroll = () => {
    if (window.pageYOffset > sticky) {
      navbar.classList.add("fixed-top");
      navbar.classList.replace("bg-transparent", "dark-bg");
    } else {
      navbar.classList.remove("fixed-top");
      navbar.classList.replace("dark-bg", "bg-transparent");
    }
  }
}