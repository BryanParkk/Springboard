<<<<<<< HEAD
const Counter = () => {

}
=======
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();
    return (
        <section>
            <p>{count}</p>
            <div>
                <button onClick={on}>+</button>
                <button>-</button>
            </div>
        </section>
    )
}

export default Counter;
>>>>>>> 16c6856e1683260f1c764344bdac450456862404
