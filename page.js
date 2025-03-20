"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { FaStar } from "react-icons/fa";

const socket = io();

export default function LiveTravelCommunity() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data));

        socket.on("newPost", (post) => {
            setPosts((prev) => [post, ...prev]);
        });
    }, []);

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        setMedia(file);
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setMediaPreview(fileURL);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("content", newPost);
        formData.append("timestamp", new Date().toISOString());
        formData.append("rating", rating);
        if (media) formData.append("media", media);

        await fetch("/api/posts", {
            method: "POST",
            body: formData,
        });

        setNewPost("");
        setMedia(null);
        setMediaPreview(null);
        setRating(0);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white shadow-xl rounded-lg mt-6 border border-gray-700">
            <h1 className="text-2xl font-bold text-center mb-4">Live Travel Community</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Type your update..."
                    className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 font-medium mb-2">Upload Media (Photo/Video):</label>
                <input 
                    type="file" 
                    accept="image/*,video/*"
                    onChange={handleMediaChange} 
                    className="w-full p-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg"
                />
                {mediaPreview && (
                    <div className="mt-3">
                        {media?.type.startsWith("image") ? (
                            <img src={mediaPreview} alt="Preview" className="w-full h-auto rounded-lg" />
                        ) : (
                            <video src={mediaPreview} controls className="w-full h-auto rounded-lg" />
                        )}
                    </div>
                )}
            </div>
            <div className="mb-4 flex items-center">
                <span className="text-gray-400 font-medium mr-2">Rating:</span>
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <FaStar
                            key={index}
                            className={`cursor-pointer ${ratingValue <= rating ? 'text-yellow-400' : 'text-gray-500'}`}
                            onClick={() => setRating(ratingValue)}
                        />
                    );
                })}
            </div>
            <button 
                onClick={handleSubmit} 
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
            >
                Post
            </button>
        </div>
    );
}
