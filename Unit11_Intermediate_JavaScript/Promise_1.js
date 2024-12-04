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
    ////////////////// await /////////////////////
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
    //////////////// Promise all // try & catch //////////////////////    
    
    let promises = [];
    for (let i = 2; i < 10; i++) {
        promises.push(wordGIF(i));
    }
    Promise.all(promises)
        .then((results) => {
            for (let i = 0; i < results.length; i++) {
                createP(results[i].word);
                if(results[i].img !== null) {
                    createImg(results[i].img);
                }
            }
        })
        .catch((err) => console.error(err));
    }

    async function wordGIF() {
        let response1 = await fetch(wordnikAPI);
        let json1 = await response1.json();
        let response2 = await fetch(giphyAPI + json1.word);
        let json2 = await response2.json();
        let img_url = null;
        try {
            img_url = json2.data[0].images['fixed_height_small'].url;
        } catch(err) {
            console.log("no image found for " + json1.word);
            console.error(err);
        }

        return {
            word: json1.word,
            url: img_url
        }
    }