function setup() {
    noCanvas();
    ///////////////////////////////////////
    fetch(wordnikAPI)
        .then(function(data) {
            console.log(data);
        }).catch(function(err) {
            console.log(err);
        });
    ///////////////////////////////////////
    fetch(wordnikAPI)
        .then(data => console.log(data))
        .catch(err => console.log(err));
    ///////////////////////////////////////
    fetch(wordnikAPI)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
    ///////////////////////////////////////
    fetch(wordnikAPI) 
        .then(response => {
            return response.json();
        })
        .then(json => {
            createP(json.word);
            return fetch(giphyAPI + json.word);
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            createImageBitmap(json.data[0].images['fixed_height_small'].url)
        })
        .catch(err => console.log(err));
    ///////////////////////////////////////
    }