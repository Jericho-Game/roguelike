import { Link } from 'react-router-dom';
import img from '../assets/images/404.svg';
import Button from '../components/Button';

export default function Page404() {
  return (
    <div className="flex flex-col w-full h-full bg-gray-100">
      <img src={img} alt="404" className="max-w-5xl w-full mx-auto mb-8" />
      <Button as={Link} variant="secondary" to="/" className="w-auto mx-auto">
        Back to home
      </Button>
    </div>
  );
}
