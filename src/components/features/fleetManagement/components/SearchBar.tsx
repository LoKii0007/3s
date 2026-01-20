import { SearchIcon } from 'lucide-react'

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <div className='absolute font-[Poppins] z-40 top-4 left-4 group transition-all duration-200 flex items-center hover:scale-105 gap-2 py-2 px-4 bg-[#FFFFFF] rounded-lg border-[#F8F8F8] border overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_3px_3px_0px_rgba(0,0,0,0.09)] '>
        <SearchIcon className='w-4 h-4 shrink-0 text-[#71717A] ' />
        <input 
          type='text' 
          placeholder='Search' 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='focus:outline-none w-[62px] group-focus-within:w-[200px] transition-all duration-200 focus:ring-0 tracking-[0.5px] leading-[100%] text-[#3F484A]' 
        />
    </div>
  )
}

export default Search