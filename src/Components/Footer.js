import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const footerLinks = [
  { name: 'Home', url: '/' },
  { name: 'About Us', url: '/about' },
  { name: 'Services', url: '/services' },
  { name: 'Contact Us', url: '/contact' },
  { name: 'Payments', url: '/payments' },
  { name: 'Shipping', url: '/shipping' },
];

const consumerPolicyLinks = [
  { name: 'Cancellation & Returns', url: '/cancellation-returns' },
  { name: 'Terms Of Use', url: '/terms-of-use' },
  { name: 'Security', url: '/security' },
  { name: 'Privacy', url: '/privacy' },
];

const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com', icon: <FaFacebookF /> },
  { name: 'Twitter', url: 'https://twitter.com', icon: <FaTwitter /> },
  { name: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram /> },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: <FaLinkedinIn /> },
];

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Quick Links Section */}
          <div className="mb-4 md:mb-0 flex-1">
            <h3 className="text-md font-semibold mb-2">Quick Links</h3>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.name} className="mb-2">
                  <a href={link.url} className="text-gray-400 hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Consumer Policy Section */}
          <div className="mb-4 md:mb-0 flex-1">
            <h3 className="text-md font-semibold mb-2">Consumer Policy</h3>
            <ul>
              {consumerPolicyLinks.map((link) => (
                <li key={link.name} className="mb-2">
                  <a href={link.url} className="text-gray-400 hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4 md:mb-0 flex-1 text-center md:text-left">
            <h2 className="text-lg font-bold mb-2">Company Name</h2>
            <p className="text-gray-400">1234 Street Name, City, State, 56789</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
            <p className="text-gray-400">Email: info@company.com</p>
          </div>
          
          {/* Follow Us Section */}
          <div className="flex-1 text-center md:text-right">
            <h3 className="text-md font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
