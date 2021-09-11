import { Heart } from 'react-feather';
import Typography from '../../components/Typography';

interface Props {
  className?: string;
}

const Bookmarks = ({ className }: Props) => {
  return (
    <div className={className}>
      <Typography component="h2" variant="body" className="font-bold">
        Bookmarks
      </Typography>
      <div className="my-4">
        <button className="flex bg-white py-2 px-4 w-full border-l-4 rounded-r-full">
          <Heart className="mr-2" />
          Favorite
        </button>
      </div>
    </div>
  );
};

export default Bookmarks;
