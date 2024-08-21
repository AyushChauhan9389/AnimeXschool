import {Facebook, Instagram, ShoppingBag, Twitter, Youtube} from "lucide-react";

export default function Footer(){
    return(
        <footer className="bg-white border-t border-gray-200 py-8 mt-8">
            <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">Shipping Policy</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">Exchange Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Information</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Connect</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-600 hover:text-gray-900"><Twitter /></a>
                        <a href="#" className="text-gray-600 hover:text-gray-900"><Instagram /></a>
                        <a href="#" className="text-gray-600 hover:text-gray-900"><Facebook/></a>
                        <a href="#" className="text-gray-600 hover:text-gray-900"><Youtube /></a>
                        <a href="#" className="text-gray-600 hover:text-gray-900"><ShoppingBag /></a>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Sign up for our newsletter</h3>
                    <p className="text-gray-600 mb-4">Receive the latest AnimeXSchool updates, insider insights, and
                        exclusive offers delivered straight to your inbox.</p>
                    <form className="flex space-x-2">
                        <input type="email" placeholder="Email address"
                               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"/>
                        <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">Submit</button>
                    </form>
                </div>
            </div>
            <div
                className="container mx-auto px-4 mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
                <p>100% Secure Payment</p>
                <p>&copy; 2024 - All rights reserved AnimeXSchool</p>
            </div>
        </footer>

    )
}