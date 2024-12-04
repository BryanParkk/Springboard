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
        wordGIF().
        then(results => {
            createP(results.word);
            createImg(results.img);
        }).
        catch(err => console.error(err));

        async function wordGIF() {
            let response1 = await fetch(wordnikAPI);
            let json1 = await response1.json();
            let response2 = await fetch(giphyAPI + json1.word);
            let json2 = await response2.json();
            let img_url = json2.data[0].images['fixed_height_small'].url;

            return {
                word: json1.word,
                url: img_url
            }
        }
        
    }