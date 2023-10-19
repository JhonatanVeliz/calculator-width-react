const Buttom = ({ text = '', onclick = '', clase = '' }) => {
  return (
    <button onClick={onclick} className={ clase }>
        { text }
    </button>
  )
}

export default Buttom