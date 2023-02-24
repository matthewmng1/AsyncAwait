let baseurl = "http://numbersapi.com"
async function getFaveNumber(){
    let favnum = await $.getJSON(`${baseurl}/1?json`);
    console.log(favnum)

}
getFaveNumber()

let nums = [3, 11, 22]

async function rdmNums(){
        let res = await $.getJSON(`${baseurl}/${nums}?json`)
        console.log(res)
    
}
rdmNums()


async function myNum(){
    let fact = await Promise.all(
        Array.from({length:4}, () => $.getJSON(`${baseurl}/10?json`))
        );
        fact.forEach(data => {
            $('body').append(`<p>${data.text}</p>`)
        });
}

myNum()