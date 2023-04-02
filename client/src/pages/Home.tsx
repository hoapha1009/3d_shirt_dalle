import { motion, AnimatePresence } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { headContainerAnimation, headContentAnimation, slideAnimation } from '../configs/motion'
import { logo } from '../assets'
import CustomButton from '../components/CustomButton'
import { setIntro } from '../components/appSlice'

type Props = {}

export default function Home({}: Props) {
  const dispatch = useAppDispatch()
  const appState = useAppSelector((state) => state.app)

  const handleClick = () => {
    const action = setIntro(false)
    dispatch(action)
  }

  return (
    <AnimatePresence>
      {appState.intro && (
        <motion.section className='home' {...slideAnimation('left')}>
          <motion.header>
            <img src={logo} alt='logo' className='h-12 w-12 object-contain' />
          </motion.header>

          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div className='head-text'>
              LET'S <br className='hidden xl:block' /> DO IT.
            </motion.div>
            <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
              <p className='max-w-md text-base font-normal text-gray-600'>
                Create your unique and exclusive shirt with our brand-new 3D customization tool.{' '}
                <strong>Unleash your imagination</strong> and define your own style.
              </p>

              <CustomButton
                type='filled'
                title='Customize It'
                handleClick={handleClick}
                customStyles='w-fit px-4 py-2.5 font-bold text-sm'
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
