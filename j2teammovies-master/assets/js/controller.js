// Gán dữ liệu vào web
var themovie_api = 'b821b0506b4f9020cc6ac49377f48963';

function slideShow($scope, $firebaseObject) {
    const ref = firebase.database().ref('movies-list');
    $scope.slideItems = $firebaseObject(ref);
    $scope.slidecur = function (index) {
        curMovies(index);
    }
};
//Lấy danh sách phim từ "themoviedb.org"
function moviesBox($scope, $http) {
    $http.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${themovie_api}&language=vi-VN`)
        .then(function (res) {
            $scope.cards = res.data.results;
        });
};
// Lấy danh sách phim sắp chiếu
function Upcomming($scope, $http) {
    $http.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${themovie_api}&language=vi-VN`)
        .then(function (res) {
            $scope.cards = res.data.results;
        });
};
// Lấy thông tin thời tiêt
function weatherWidget($scope, $http) {
    $http.get(`https://openweathermap.org/data/2.5/weather/?appid=b6907d289e10d714a6e88b30761fae22&lat=10.825911&lon=106.6869141&units=metric`)
        .then(function (res) {
            $scope.main = res.data.main;
            $scope.city = res.data.name;
        });
};
//Thêm phim vào danh sách chờ
function formRequest($scope, $firebaseObject) {
    let ref = firebase.database().ref('movies-request');
    let pushKey = ref.push().key;
    $scope.formData = $firebaseObject(ref.child(pushKey));
    $scope.submit = function () {
        if (validateForm()) {
            $scope.formData.$save().then(() => {
                alert('Đã thêm vào danh sách chờ!!!')
            });
        }
    }
};
//Gán phim vào bảng danh sách chờ
function moviesList($scope, $firebaseObject) {
    const ref = firebase.database().ref('movies-request');
    $scope.moviesData = $firebaseObject(ref);
};


// Gán danh sách phim và phân trang
function moviesBoxx($scope, $http) {
    $scope.page = 1;

    function loadPage(page) {
        $http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${themovie_api}&language=vi-VN&page=${page}`)
            .then(function (response) {
                $scope.cards = response.data.results;
            });
    }
    loadPage(1);
    $scope.next = function () {
        loadPage(++$scope.page);
    }
    $scope.prev = function () {
        if ($scope.page - 1 > 0)
            loadPage(--$scope.page);
    }
};

angular.module('home', ["firebase"])
    .controller('slideShow', slideShow)
    .controller('moviesBox', moviesBox)
    .controller('Upcomming', Upcomming)
    .controller('weatherWidget', weatherWidget);
angular.module('moviesRequest', ["firebase"])
    .controller('formRequest', formRequest)
    .controller('moviesList', moviesList);
angular.module('moviesList', [])
    .controller('moviesBox', moviesBoxx);