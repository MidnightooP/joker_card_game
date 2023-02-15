import React from 'react';
import { Image } from '@chakra-ui/react';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = importAll(
  require.context('./cardfixed', false, /\.(png|jpe?g|svg)$/)
);

export function Card({ w = 70, selected, color, num, onClick, idx }) {
  let img;
  if (!num) img = images['back.svg'];
  else img = images[num + '_of_' + color + '.svg'];

  return (
    <Image
      sx={{
        zIndex: idx,
        filter: selected ? ' sepia(60%) brightness(0.5)' : '',
      }}
      onClick={onClick}
      w={w}
      src={img}
    />
  );
}
