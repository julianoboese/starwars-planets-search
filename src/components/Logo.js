import React from 'react';
import { Box } from '@mui/material';
import star from '../starWarsAnimation/star.svg';
import wars from '../starWarsAnimation/wars.svg';
import '../starWarsAnimation/starWars.css';
import background from '../starWarsAnimation/bg.jpg';

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
