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

export function Card({ w, color, num }) {
  return <Image w={w} src={images[num + '_of_' + color + '.svg']} />;
}
