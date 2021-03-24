import React, { memo } from 'react';

const Logo = ({ size, pointerCursor }) => {
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 874 1024"
      css={{ width: size, height: size }}
      xmlSpace="preserve"
    >
      <g>
        <polygon
          css={{ fill: '#365076', cursor: pointerCursor ? 'pointer' : '' }}
          points="874.343,259.5 437,7 -0.343,259.5 -0.343,764.5 437,1017 874.343,764.5 	"
        />
        <g css={{ cursor: pointerCursor ? 'pointer' : '' }}>
          <path
            css={{ fill: '#FFFFFF' }}
            d="M437,759.001L437,759.001c74.506,0,134.905-60.399,134.905-134.905v-22.951
			c0-1.958,1.17-3.705,2.987-4.435c20.944-8.416,144.47-63.461,128.17-185.276C685.5,280.178,522.473,300.771,440.29,379.179
			c-1.859,1.774-4.72,1.774-6.58,0c-82.183-78.408-245.21-99.001-262.772,32.255c-16.299,121.815,107.226,176.861,128.17,185.276
			c1.817,0.73,2.987,2.477,2.987,4.435v22.951C302.095,698.602,362.494,759.001,437,759.001L437,759.001L437,759.001z"
          />
          <g>
            <path
              css={{ fill: '#365076' }}
              d="M379.246,498.979c0.398,4.648-5.319,7.168-8.365,3.635c-9.897-11.482-28.728-27.878-60.302-36.628
				c-51.838-14.365,3.123-44.968,24.358-34.975C354.091,440.025,375.278,452.596,379.246,498.979z"
            />
            <path
              css={{ fill: '#365076' }}
              d="M494.754,498.979c-0.398,4.648,5.319,7.168,8.365,3.635c9.897-11.482,28.728-27.878,60.302-36.627
				c51.838-14.365-3.123-44.968-24.358-34.975C519.909,440.025,498.722,452.596,494.754,498.979z"
            />
          </g>
          <g>
            <path
              css={{ fill: '#365076' }}
              d="M467.532,567.716c7.069,15.684,18.396,46.949,8.518,69.106c-1.378,3.092-5.593,3.623-7.838,1.091
				c-8.093-9.127-22.598-32.049-9.584-69.713C460.051,564.08,465.741,563.743,467.532,567.716z"
            />
            <path
              css={{ fill: '#365076' }}
              d="M406.468,567.716c-7.069,15.684-18.396,46.949-8.518,69.106c1.378,3.092,5.593,3.623,7.838,1.091
				c8.093-9.127,22.598-32.049,9.584-69.713C413.949,564.08,408.259,563.743,406.468,567.716z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default memo(Logo);