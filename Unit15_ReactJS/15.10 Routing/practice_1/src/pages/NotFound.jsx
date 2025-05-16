import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <h2>Page not found!</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam eaque nulla rerum, fuga cum expedita eius error asperiores totam? Asperiores officiis perferendis aut dolor voluptas ipsa, porro consequatur ab cumque voluptatum aperiam sed fuga pariatur hic delectus iusto, accusantium, rerum magni molestiae nobis. Asperiores aperiam omnis aspernatur et. In, assumenda!</p>

      <p>Go to the <Link to="/">Homepage</Link></p>
    </div>
  )
}
