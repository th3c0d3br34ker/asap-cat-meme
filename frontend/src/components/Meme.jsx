const Meme = ({ name, img_url }) => {
  return (
    <div className='meme-card'>
      <img src={img_url} alt={name} className='meme-img' />
      <h3 className='meme-title'>{name}</h3>
    </div>
  );
};

export default Meme;
