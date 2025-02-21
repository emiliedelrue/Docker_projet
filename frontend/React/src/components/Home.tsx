import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Book } from '../types.ts';


const renderTable = (data: Book[]) => {
        return (<table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Auteur</th>
              <th scope="col">ISBN</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map((book, index) => {
                    return (
                        <tr key={index} scope="row">
                            <td>{index + 1}</td>
                            <td>{book.name}</td>
                            <td>{book.auteur}</td>
                            <td>{book.ISBN}</td>
                            <td>
                                <Link to={`/read/${book._id}`} className='btn btn-info'>Read</Link>
                                <Link to={`/update/${book._id}`} className='btn btn-primary'>Edit</Link>
                                <Link to={`/delete/${book._id}`} className='btn btn-danger'>Delete</Link>
                            </td>
                        </tr>
                    );
                })
            }
          </tbody>
        </table>);
}

function Home() {
	const [products, setProducts] = useState<Book[]>([]);

	useEffect(() => {
        const getProducts  = async () => {
            try {
                const res = await axios.get('http://localhost:5100/api/Books');
                setProducts(res.data.message);
            } catch (error) {
                console.log(error);
            }
        }
	getProducts();
	},[])
	return (
    <>
	<h1>Home</h1>
	<Link to='/create' className='btn btn-success'>Create +</Link>
    {renderTable(products)}
    </>
	);
}

export default Home;
