import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowDown, faFilter, faShoppingBasket, faShoppingCart, faSort, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Products from "./Products";
// import Pagination from "./Pagination"

function Home() {

    const [products, setProducts] = useState([])
    // const [sortType, setSortType] = useState('Sortuj');
    // const [currentPage, setCurrentPage] = useState(1);
    // const [pageProducts] = useState(10);


    useEffect(() => {
        axios.get('http://localhost:5000/products')
        .then(response => setProducts(response.data))
        .catch(error => console.log(error))
    },[])

    // useEffect(() => {
    //     const sortArray = type => {
    //       const types = {
    //         titleup: "titleup",
    //         titledown: "titledown",
    //         yearup: "yearup",
    //         yeardown: "yeardown",
    //         ratingup: "ratingup",
    //         ratingdown: "ratingdown"
    //       };
    //       const sortProperty = types[type];
    //       let sorted
    //       if (sortProperty === 'titleup') {
    //         sorted = [...movies].sort((a,b) => a.title.localeCompare(b.title));
    //       }
    //       else if (sortProperty === 'titledown') {
    //         sorted = [...movies].sort((a,b) => b.title.localeCompare(a.title));
    //       }
    //       else if (sortProperty === 'yearup') {
    //         sorted = [...movies].sort((a, b) => a.year - b.year);
    //       }
    //       else if (sortProperty === 'yeardown') {
    //         sorted = [...movies].sort((a, b) => b.year - a.year);
    //       }
    //       else if (sortProperty === 'ratingup') {
    //         sorted = [...movies].sort((a, b) => a.rating - b.rating);
    //       }
    //       else {
    //         sorted = [...movies].sort((a, b) => b.rating - a.rating);
    //       }
    //       return setMovies(sorted);
    //     };
    //     return sortArray(sortType);
    //     // eslint-disable-next-line
    //   }, [sortType]);

    //   const indexOfLastMovie = currentPage * pageMovies;
    //   const indexOfFirstMovie = indexOfLastMovie - pageMovies;
    //   const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie)
    //   const paginate = (pageNum) => {
    //     setCurrentPage(pageNum)
    //   }


    return (
    <div>
        <div className="home-photo-cont"></div>
        <button className="home-btn">
            <div>BE COOL</div>
        </button>
        {/* <div>
            <select className="form-select" onChange={(e) => setSortType(e.target.value)}>
                <option defaultValue="Sortuj">Sortuj</option>
                <option value="titleup">Tytuł A-Z</option>
                <option value="titledown">Tytuł Z-A</option>
                <option value="yearup">Rok {'\u2191'}</option>
                <option value="yeardown">Rok {'\u2193'}</option>
                <option value="ratingup">Ocena {'\u2191'}</option>
                <option value="ratingdown">Ocena {'\u2193'}</option>
            </select>
        </div> */}
        <Products products={products} />
        {/* <div className="pagination-box">
          <Pagination pageMovies={pageMovies} totalMovies={movies.length} paginate={paginate} currentPage={currentPage}/>
        </div> */}
    </div>
    )
}

export default Home;