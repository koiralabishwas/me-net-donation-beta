import Image from 'next/image';
import React from 'react';
import pic from './pic.png';

const License: React.FC = () => {
  return (
    <div className="bg-red-300 flex justify-end p-4">
      <div className="text-right">
        <div>this is the main certificateである。わかるか。</div>
        <Image src={pic} width={400} height={100} alt="image" />
      </div>
    </div>
  );
};

export default License;
