function  extraiLinks(arrLinks) {
    return arrLinks.map((obj) => Object.values(obj).join())
}

async function checaStatus(listaURLs) {
    const arrStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url, { method: 'HEAD'});
                return response.status
            } catch (erro) {
                
            }
        })
    )
    return arrStatus;
};

export default async function listaValidada (listaDeLinks) {
    const links = extraiLinks(listaDeLinks)
    const status = await checaStatus(links)
    console.log(status);
    return status
};

// [gatinho salsicha](http://gatinhosalsicha.com.br/)