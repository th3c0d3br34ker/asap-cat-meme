import { useNavigate } from "react-router-dom";

const Meme = ({ _id, name, img_url, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <div className='meme-card'>
      <img src={img_url} alt={name} className='meme-img' />
      <div className='meme-body'>
        <h3 className='meme-title'>{name} </h3>
        <div>
          <button onClick={() => navigate(`/${_id}`)}>✏️</button>
          <button onClick={() => handleDelete(_id)}>🗑️</button>
        </div>
      </div>
    </div>
  );
};

export default Meme;
