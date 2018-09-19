import React from 'react';
import PropTypes from 'prop-types';

const SVGLogo = props => {
  return (
    <svg className={props.className} width="512" height="512" viewBox="0 -26 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="m256 360c5.5195 0 10-4.4805 10-10s-4.4805-10-10-10-10 4.4805-10 10 4.4805 10 10 10z" />
      <path d="m422 180c-5.5195 0-10 4.4805-10 10s4.4805 10 10 10 10-4.4805 10-10-4.4805-10-10-10z" />
      <path d="m176 460c90.027 0 163.92-62.07 169.63-140.25 85.738-4.3008 166.37-66.125 166.37-149.75 0-34.945-13.828-68.805-39-95.633-4.9805-20.531 1.0664-42.293 16.07-57.297 2.8594-2.8594 3.7148-7.1602 2.168-10.898-1.5469-3.7344-5.1914-6.1719-9.2383-6.1719-28.52 0-56.004 11.184-76.426 30.891-19.895-6.7812-45.852-10.891-69.574-10.891-90.016 0-163.9 62.055-169.63 140.22-20.938 0.92968-42.715 4.7969-59.945 10.668-20.422-19.707-47.906-30.891-76.426-30.891-4.0469 0-7.6914 2.4375-9.2383 6.1719-1.5469 3.7383-0.69141 8.0391 2.168 10.898 15.004 15.004 21.051 36.766 16.07 57.297-25.172 26.828-39 60.688-39 95.633 0 86.887 86.84 150 176 150zm160-420c23.602 0 50.496 4.6328 68.512 11.801 3.8594 1.5391 8.2695 0.52734 11.078-2.5391 12.074-13.199 27.773-22.402 44.879-26.633-9.4258 18.059-11.832 39.348-6.0977 59.52 0.45313 1.5898 1.293 3.043 2.4453 4.2266 22.688 23.367 35.184 53.066 35.184 83.625 0 70.469-71.438 130-156 130-79.852 0-150-55.527-150-130 0-71.684 67.289-130 150-130zm-280.82 186.38c1.1523-1.1875 1.9922-2.6406 2.4453-4.2266 5.7344-20.172 3.3281-41.461-6.0977-59.52 17.105 4.2266 32.805 13.434 44.879 26.633 2.8086 3.0625 7.2188 4.0781 11.078 2.5391 15.613-6.2109 37.887-10.512 58.914-11.551 2.9219 37.816 21.785 73.359 54.035 99.75h-130.44c-5.5234 0-10 4.4766-10 10s4.4766 10 10 10h161.16c22.699 11.555 48.188 18.293 74.422 19.707-5.7461 67.164-70.641 120.29-149.58 120.29-84.562 0-156-59.531-156-130 0-30.559 12.496-60.258 35.184-83.625z" />
      <path d="m256 200h126c5.5234 0 10-4.4766 10-10s-4.4766-10-10-10h-126c-5.5234 0-10 4.4766-10 10s4.4766 10 10 10z" />
      <path d="m256 140h166c5.5234 0 10-4.4766 10-10s-4.4766-10-10-10h-166c-5.5234 0-10 4.4766-10 10s4.4766 10 10 10z" />
      <path d="m90 360h126c5.5234 0 10-4.4766 10-10s-4.4766-10-10-10h-126c-5.5234 0-10 4.4766-10 10s4.4766 10 10 10z" />
    </svg>
  );
};

SVGLogo.propTypes = {
  className: PropTypes.string.isRequired
};

export default SVGLogo;
