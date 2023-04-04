import CustomButton from './CustomButton'

type Props = {
  file: File | null
  setFile: (file: File) => void
  readFile: (type: 'logo' | 'full') => void
}

export default function FilePicker({ file, setFile, readFile }: Props) {
  return (
    <div className='filepicker-container'>
      <div className='flex flex-1 flex-col'>
        <input
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={(e) => {
            setFile((e.target.files as FileList)[0])
          }}
        />
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload File
        </label>

        <p className='mt-2 truncate text-xs text-gray-500'>{!file ? 'No file selected' : file.name}</p>

        <div className='mt-auto flex flex-wrap gap-3'>
          <CustomButton type='outline' title='Logo' handleClick={() => readFile('logo')} customStyles='text-xs' />
          <CustomButton type='filled' title='Full' handleClick={() => readFile('full')} customStyles='text-xs' />
        </div>
      </div>
    </div>
  )
}
