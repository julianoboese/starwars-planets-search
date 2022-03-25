import React from 'react';
import { Box } from '@mui/material';
import star from '../assets/starWarsAnimation/star.svg';
import wars from '../assets/starWarsAnimation/wars.svg';
import '../assets/starWarsAnimation/starWars.css';
import background from '../assets/images/background.jpg';

function Logo() {
  return (
    <Box sx={ { height: '100vh', background: `black url(${background})` } }>
      <div className="starwars-demo">
        <img src={ star } alt="Star" className="star" />
        <img src={ wars } alt="Wars" className="wars" />
        <h2 className="byline" id="byline">
          {'Planets'.split('')
            .map((letter, index) => <span key={ index }>{letter}</span>)}
        </h2>
      </div>
    </Box>
  );
}

export default Logo;
