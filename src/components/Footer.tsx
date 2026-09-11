export const Footer = () => {
  return (
    <footer className="w-full bg-[#4338CA] text-white mt-8">
      <div className="w-[1280px] mx-auto px-[72px] py-10 flex justify-between text-xs">
        <div>
          <p className="font-bold italic mb-4">▦ Movie Z</p>
          <p>© 2024 Movie Z. All Rights Reserved.</p>
        </div>

        <div>
          <p className="mb-3 font-medium">Contact Information</p>
          <p>Email: support@movieZ.com</p>
          <p className="mt-3">Phone: +976 111 123-4567</p>
        </div>

        <div>
          <p className="mb-3 font-medium">Follow us</p>
          <p>Facebook &nbsp; Instagram &nbsp; Twitter &nbsp; Youtube</p>
        </div>
      </div>
    </footer>
  );
};
