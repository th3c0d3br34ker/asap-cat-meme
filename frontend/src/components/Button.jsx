const Button = ({ loading, children, ...rest }) => {
  return (
    <button {...rest} disabled={loading}>
      {loading ? '⌛️ please wait...' : children}
    </button>
  );
};
 
export default Button;
