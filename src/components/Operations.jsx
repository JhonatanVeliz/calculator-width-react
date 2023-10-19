const Operations = ({ operation = '', result = '', onclick = '' }) => {

  const handleClick = () => {
    onclick( operation, result )
  }

  return (
    <div 
      className="db__result text-white font-bold text-3xl pt-2 text-center cursor-pointer"
      onClick={handleClick}
    >
      <span >{ operation }</span>=<span>{ result }</span>
    </div>
  )
}

export default Operations