import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Book } from '../types.ts';

const renderTable = (data: Book[]) => {
        return (<table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">ISBN</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map((book, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
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
                const res = await axios.get('http://localhost:5201/api/books');
                console.log(res.data);
                setProducts(res.data);
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
