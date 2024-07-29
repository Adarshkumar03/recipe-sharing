import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-gray-100 py-5">
      <div className="container mx-auto text-center">
        <p className="text-gray-600 text-sm">
          &copy; {currentYear} Recipe Sharing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
