import ByFedir from './shared/ByFedir';
import FlipText from './shared/FlipText';
import { Link } from 'react-router-dom';

function Header() {
   return (
      <div className='flex justify-between'>
         <div className='flex gap-32'>
            <Link to="/">
               <ByFedir />
            </Link>

            <p>(To-do’s & note taking)</p>
         </div>
         <div className='flex'>
            <div className='inline-block'>
               <Link to="/login">
                  <FlipText>
                     Login
                  </FlipText>
               </Link>
               <span>, </span>
               <Link to="/registration">
                  <FlipText>
                     Registration
                  </FlipText>
               </Link>
            </div>
         </div>
      </div>
   );
}

export default Header;