import { useParams } from "react-router-dom";

function SingleCocktail() {
    const param = useParams();
    console.log(param)

    return (
        <div>Single Cocktail</div>
    )
}

export default SingleCocktail;