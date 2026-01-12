import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t bg-[var(--bg)] mt-20">
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-semibold mb-3">Stay in the loop</h4>

          <p className="text-gray-500 mb-3 text-sm">
            Get updates on sales & new arrivals
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 border px-3 py-2 text-sm outline-none"
            />
            <button className="bg-[var(--primary)] text-white px-4 text-sm font-semibold">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* BRAND */}
        <div>
          <h3 className="font-semibold mb-4">CLOTHESGPT</h3>
          <p className="text-gray-500">Discover fashion that defines you.</p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="font-semibold mb-4">Online Shopping</h4>
          <ul className="space-y-2 text-gray-500">
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Beauty</li>
          </ul>
        </div>

        {/* POLICIES */}
        <div>
          <h4 className="font-semibold mb-4">Customer Policies</h4>
          <ul className="space-y-2 text-gray-500">
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Returns</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4 text-gray-500">
            <motion.span whileHover={{ scale: 1.1 }} className="cursor-pointer">
              Instagram
            </motion.span>
            <motion.span whileHover={{ scale: 1.1 }} className="cursor-pointer">
              Twitter
            </motion.span>
            <motion.span whileHover={{ scale: 1.1 }} className="cursor-pointer">
              Facebook
            </motion.span>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} CLOTHESGPT. All rights reserved.
      </div>
    </footer>
  );
}
