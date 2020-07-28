window.onload = () => {

    console.log('Acessou o nosso main.js')

    const fotosContainer = document.querySelector('#fotosContainer')
    const endpointApiFotos = 'https://jsonplaceholder.typicode.com/photos'

    const adicionarAtributos = function (elemento, atributos) {
        for (let key in atributos) {
            elemento.setAttribute(key, atributos[key])
        }
    }

    const criarNovoThumb = (imgId, imgThumb) => {
        if (!document.querySelector('#listaThumbs')) {
            listaThumbs = document.createElement('ul');
            adicionarAtributos(listaThumbs, {
                'id':'listaThumbs',
                'style':'list-style:none;display:flex;flex-flow:row wrap;justify-content: space-between;margin:0 auto 50px auto',
                'class': 'row'
            })
        } else {
            listaThumbs = document.querySelector('#listaThumbs')
        }

        novoThumb = document.createElement('li')
        novoThumb.style = 'flex: 0 0 10%; margin:0; padding: 0'

        novoThumbTarget = document.createElement('a')
        adicionarAtributos(novoThumbTarget, {
            'href': `#imgContainer-${imgId}`,
            'title':`Ir para a imagem ${imgId}`,
            'class': 'thumb-imagem'
        })
        novoThumbTarget.style.width = '100%'

        novaImgThumb = document.createElement('img')
        adicionarAtributos(novaImgThumb, {
            'id': `imagem-thumb-${imgId}`,
            'src': imgThumb,
            'width': '100%',
            'height': 'auto'
        })

        novoThumbTarget.appendChild(novaImgThumb)
        novoThumb.appendChild(novoThumbTarget)
        listaThumbs.appendChild(novoThumb)
        fotosContainer.prepend(listaThumbs)

    }

    const criarNovaImagem = (imgAlbum, imgId, imgTitle, imgFull) => {

        novoArticle = document.createElement('article')
        adicionarAtributos(novoArticle, {
            'class': 'col-6 col-md-4 col-lg-3',
            'id': `imgContainer-${imgId}`,
            'style': 'margin:0; padding: 0'
        })

        novaImg = document.createElement('img')
        adicionarAtributos(novaImg, {
            'id': `imagem-${imgId}`,
            'title': `Imagem ${imgTitle} do álbum ${imgAlbum} - ${imgTitle}`,
            'src': imgFull,
            'style': 'width: 100%; height:auto'
        })

        novoTitulo = document.createElement('h3')
        novoTituloTexto = document.createTextNode(imgTitle)
        novoTitulo.appendChild(novoTituloTexto)

        novoArticle.appendChild(novaImg)
        novoArticle.appendChild(novoTitulo)
        fotosContainer.appendChild(novoArticle)

    }

    fetch(endpointApiFotos)
        .then(response => response.json())
        .then(json => {

            const fotosPrimeiroAlbum = json.filter( foto => {
                return foto.albumId === 4
            })

            for(foto in fotosPrimeiroAlbum) {

                criarNovoThumb(fotosPrimeiroAlbum[foto]['id'], fotosPrimeiroAlbum[foto]['thumbnailUrl'])

                criarNovaImagem(fotosPrimeiroAlbum[foto]['albumId'], fotosPrimeiroAlbum[foto]['id'], fotosPrimeiroAlbum[foto]['title'], fotosPrimeiroAlbum[foto]['url'])

            }

        })

}