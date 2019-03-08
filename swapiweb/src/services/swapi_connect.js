import axios from 'axios';

export const swapiRequest = async (urlChange=false, page, object="people") => {

    let cors = `https://cors-anywhere.herokuapp.com/`; //Cors router para acessar a api
    let urlRequest = `${cors}https://swapi.co/api/${object}?page=1`;

    urlChange ? (() => { //Se houver urlChange a consulta será por essa url
        urlRequest = cors+urlRequest;
    })() :

        (() => { // Se não houver urlChange, varifica se há algo no page
            page ? (() => { urlRequest = `${cors}https://swapi.co/api/${object}?page=${page}`;})() : // Se houver page alterar a url para consultar por página

                (() => {})();
        })(); // Mantém o urlRequest definida na declaração

    try {
        let res = await axios.get(urlRequest);
        
        let obj = object === 'peoples' ? 'people' : object;
        res.data.results.map(item => {
            let i = Math.random(30);
            item.avatar = `http://i.pravatar.cc/40?img=${i}`; // Cria um parâmetro avatar com valor aleatório para cada item do objeto

            let url = item.url;
            url = url.replace(`https://swapi.co/api/${obj}/`, '');
            item.idItem = url.replace('/', '');
            
        })
        page ? (() => res.data.page = page)() : (() => res.data.page = 1)();

        res.data.pageCount = Math.ceil(res.data.count / 10);
        res.data.object = (() => { // Prepara e guarda o título para ser usado na tabela
            object = `${object}`.charAt(0).toUpperCase() + `${object}`.slice(1);
            return object === 'People' ? `${object}s` : object;
        })();

        return res.data;
    } catch (e) {
        console.log(e);
    }
}

export const detailsRequest = async (object, id) => {

    let cors = `https://cors-anywhere.herokuapp.com/`; //Cors router para acessar a api
    let urlRequest = `${cors}https://swapi.co/api/${object}/${id}`;

    try {
        let res = await axios.get(urlRequest);

        let i = Math.random(30);
        res.data.avatar = `http://i.pravatar.cc/120?img=${i}`; // Cria um parâmetro avatar com valor aleatório para cada item do objeto
        
        return res;
    } catch (error) {
        console.log(error);
    }
}