const Filter = ({filterCondition, handleCondition}) => {
    return (
        <form>
        filter shown with
        <input
        value={filterCondition}
        onChange={handleCondition}
        />
      </form>
    )
}

export default Filter