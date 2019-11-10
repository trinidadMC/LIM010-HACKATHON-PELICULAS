const mostFamous = ['tt0267804', 'tt0756683', 'tt0103639', 'tt0910970', 'tt0451279','tt0119654', 'tt0107290', 'tt0286716', 'tt0145487', 'tt0083658'];
const mostAwarded = ['tt0371746', 'tt3890160', 'tt0120804', 'tt0418279', 'tt0116629', 'tt0120591', 'tt0803096', 'tt1840309', 'tt1477834', 'tt0974015'];
const blockbuster = ['tt2737304', 'tt0088763', 'tt8709288', 'tt0480249', 'tt4154916', 'tt3256226', 'tt1276104', 'tt3315342', 'tt0903624', 'tt0090605'];
const moreRealistic = ['tt1355644', 'tt0120903','tt1631867', 'tt0076759', 'tt0106062', 'tt1270797', 'tt0848228', 'tt0499549', 'tt5815594', 'tt3006802'];
let containerMovies = document.getElementById('container-movies');

let arrMostFamous = [];
let arrMostAwarded = [];
let arrBlockbuster = [];
let arrMoreRealistic = [];

let arrMoviesTemp = [];

window.scifi = {

getSciFiData : (arrMovies) => {
        arrMovies.map((idMovie) => {
    
            fetch('https://www.omdbapi.com/?i=' + idMovie + ' &apikey=715025ae')
            .then( response => response.json())
            .then( movies => {          
                    arrMoviesTemp.push(movies);           
            });            
    })
    return arrMoviesTemp;
},

orderData : (array, orderAll, condicion) => {

const asc = (a,b) => {
    return a.Title > b.Title ? 1 : -1;
};

const desc = (a,b) => {
    return a.Title < b.Title ? 1 : -1;
};

    let ordered = [];
if (orderAll === 'Todos'){
    switch (condicion){
        case 'Ordenar A-Z':
            ordered = array.sort(asc);
            break
        case 'Ordenar Z-A':
            ordered = array.sort(desc);
        }
        return ordered
    }
    
},

showData : (arrMovies) => {
    containerMovies.innerHTML = ''; 
    arrMovies.forEach(movies => {
        containerMovies.innerHTML +=  `<section> 
        <div class="flip-card card-block" style="width:400px heigth:500px">

            <div class="flip-card-inner">
                                                                
                <div class="flip-card-front">
                    <img class="card-img" src='${movies.Poster}' alt="Card image" style="width:100%"">
                    
                    <div class="">
                    <h3 class="card-title" id="title-movie">${movies.Title}</h3>
                    </div>

                </div>                                                

                <div class="flip-card-back">
                    <h3 class="flip-card-title">${movies.Title}</h3>
                    <p class="card-text"> <span style="font-weight:bold"> Plot </span>: ${movies.Plot}</p>
                    <p class="card-text"> <span style="font-weight:bold"> Duración </span>: ${movies.Runtime}</p>
                    <p class="card-text"> <span style="font-weight:bold"> Género </span>: ${movies.Genre}</p>
                    <p class="card-text"> <span style="font-weight:bold"> Nominaciones </span>: ${movies.Awards}</p>
                    <p class="card-text"> <span style="font-weight:bold"> Director </span>: ${movies.Director}</p>
                    <p class="card-text"> <span style="font-weight:bold"> Actores </span>: ${movies.Actors}</p>                                                                                                                                        
                </div>

            </div>

        </div>
                
                </section>`;
    });
    }
};

const LoadData = () => {
    arrMostFamous = scifi.getSciFiData(mostFamous);
    arrMostAwarded = scifi.getSciFiData(mostAwarded);
    arrBlockbuster = scifi.getSciFiData(blockbuster);
    arrMoreRealistic = scifi.getSciFiData(moreRealistic);
}

LoadData();

document.getElementById('container-slide-buttons').classList.remove('hide');

const btnFamousMovies = document.getElementById('btn-famous-movies');
btnFamousMovies.addEventListener('click', () =>{
    document.getElementById('title-famous').classList.remove('hide');
    document.getElementById('container-cards').classList.remove('hide');
    document.getElementById('container-slide-buttons').classList.add('hide');
    document.getElementById('title-awarded').classList.add('hide');
    document.getElementById('title-blockbuster').classList.add('hide');
    document.getElementById('title-realistic').classList.add('hide');

    scifi.showData(arrMostFamous);
    document.getElementById('sort-menu').classList.remove('hide');
});

const btnAwardedMovies = document.getElementById('btn-awarded-movies');
btnAwardedMovies.addEventListener('click', () =>{
    document.getElementById('title-awarded').classList.remove('hide');
    document.getElementById('container-cards').classList.remove('hide');
    document.getElementById('container-slide-buttons').classList.add('hide'); 
    document.getElementById('title-famous').classList.add('hide'); 
    document.getElementById('title-blockbuster').classList.add('hide');
    document.getElementById('title-realistic').classList.add('hide'); 

    scifi.showData(mostAwarded);
    document.getElementById('sort-menu').classList.remove('hide');
});

const btnBlockbusterMovies = document.getElementById('btn-blockbuster-movies');
btnBlockbusterMovies.addEventListener('click', () =>{
    document.getElementById('title-blockbuster').classList.remove('hide');
    document.getElementById('container-cards').classList.remove('hide');
    document.getElementById('container-slide-buttons').classList.add('hide');
    document.getElementById('title-famous').classList.add('hide');
    document.getElementById('title-awarded').classList.add('hide');
    document.getElementById('title-realistic').classList.add('hide');    

    document.getElementById('sort-menu').classList.remove('hide');
});

const btnRealisticMovies = document.getElementById('btn-realistic-movies');
btnRealisticMovies.addEventListener('click', () =>{
    document.getElementById('title-realistic').classList.remove('hide'); 
    document.getElementById('container-cards').classList.remove('hide');
    document.getElementById('container-slide-buttons').classList.add('hide'); 
    document.getElementById('title-awarded').classList.add('hide');
    document.getElementById('title-famous').classList.add('hide'); 
    document.getElementById('title-blockbuster').classList.add('hide'); 

    scifi.showData(arrMoreRealistic);
    document.getElementById('sort-menu').classList.remove('hide');
});

const btnOrder = document.getElementById('sort-btn');
btnOrder.addEventListener('click', ()=>{
    let orderAll = document.getElementById('filter').value;
    let orderSelected = document.getElementById('order-type').value;
    let arrData = arrMoviesTemp;
    let orderedData = scifi.orderData(arrData, orderAll, orderSelected );
    scifi.showData(orderedData);
})
