import { useNavigate } from "react-router-dom";

const Meme = ({ _id, name, img_url, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <div className='meme-card'>
      <img src={img_url} alt={name} className='meme-img'/>
      <h3 className='meme-title'>{name} </h3>
      <button onClick={() => navigate(`/${_id}`)}>✏️</button>
      <button onClick={() => handleDelete(_id)}>🗑️</button>
    </div>
  );
};

export default Meme;
