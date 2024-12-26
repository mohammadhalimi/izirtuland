const Search = ({ value, onChange }) => {
    return (
        <div className="container p-2">
        <form>
          <div className="relative md:w-1/2 mx-auto">
            <input
              dir='rtl'
              value={value}
              onChange={onChange}
              type="search"
              id="search"
              className="block w-full p-4 pl-10 font-primaryMedium text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-color2 focus:border-color2 drop-shadow focus:outline-none"
              placeholder="جستجوی محصولات"
              required
            />
          </div>
        </form>
      </div>
      
    )
}

export default Search;