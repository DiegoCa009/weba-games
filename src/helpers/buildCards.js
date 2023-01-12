import { shuffle }from "underscore";

const build = (type="animals", rows = 3, columns = 4)=>{
    let modules;
    const imgStyles = {
        backgroundColor: 'black',
        filter: 'contrast(0)',
    }

    switch (type) {
       
            case "princess":
                modules = import.meta.glob('/public/princess/*');
            break;

            case "animals":
                modules = import.meta.glob('/public/animals/*');
            break;
                default:
                    break;
                }


    const num = (rows * columns) / 2 ;
    let cards = [];
    let links = shuffle(Object.keys(modules).map((link)=> link.replace('/public','')))
    for (let i = 0; i < num; i ++){
        cards.push({name: links[i], value: (i), ctrl: true, style: imgStyles});
        cards.push({name: links[i], value: ((i+1)*12), ctrl: true, style: imgStyles});
    }
    cards = shuffle(cards);
    const TABLE_STYLE = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns},3rem)`,
        gridTemplateRows: `repeat(${rows},3rem)`,      
        gap: '10px',
        }
    return {
        TABLE_STYLE,
        cards    
    };
}
export {build};


