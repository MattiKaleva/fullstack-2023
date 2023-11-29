const Form = ({addName, newName, handleNewName, newNamber, handleNewNamber}) => {
    return (
        <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNewName}
          />
          <div>
            number: <input
            value = {newNamber}
            onChange={handleNewNamber}
          />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form