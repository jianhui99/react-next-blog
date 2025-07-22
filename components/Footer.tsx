import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-black py-6 px-4 sm:px-10 gap-4">
      <Image src={assets.logo_light} alt="logo" width={120} />

      <p className="text-sm text-white text-center sm:text-left">
        © 2025 Blogger. All rights reserved.
      </p>

      <div className="flex gap-3">
        <Image src={assets.facebook_icon} alt="facebook" width={32} height={32} />
        <Image src={assets.googleplus_icon} alt="google+" width={32} height={32} />
        <Image src={assets.twitter_icon} alt="twitter" width={32} height={32} />
      </div>
    </div>
  );
};

export default Footer;
