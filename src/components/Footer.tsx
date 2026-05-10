import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm font-medium">
            Copyright © {currentYear} SDI Health Care, All Rights Reserved
          </div>
          <div className="flex items-center gap-6">
            <Link 
              href="/terms" 
              className="text-teal-600 hover:text-teal-700 text-sm font-bold transition-colors border-r border-slate-300 pr-6"
            >
              Terms
            </Link>
            <Link 
              href="/privacy" 
              className="text-teal-600 hover:text-teal-700 text-sm font-bold transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
