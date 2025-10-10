import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Heart } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { addToWishlist, removeFromWishlist } from '../../Api';

function WhishBtn({ propertyId, initialStatus, onToggle }) {
  const { user: authUser } = useAuth();
  const [liked, setLiked] = useState(initialStatus);
  const heartRef = useRef(null);
  const navigate = useNavigate();

  const handleHeartClick = (e) => {
    e.preventDefault();
    if (!authUser) return navigate('/login');

    const newStatus = !liked;

    // 1️⃣ Update state immediately for instant UI
    setLiked(newStatus);
    if (onToggle) onToggle(propertyId, newStatus);

    // 2️⃣ Add tiny visual animation
    heartRef.current?.classList.add('animate-bounce');
    setTimeout(() => heartRef.current?.classList.remove('animate-bounce'), 200);

    // 3️⃣ Fire & forget API call
    (async () => {
      try {
        if (newStatus) {
          const res = await addToWishlist(propertyId, String(authUser.id));
          if (!res.status) throw new Error('Failed to add wishlist');
        } else {
          const res = await removeFromWishlist(propertyId, String(authUser.id));
          if (!res.status) throw new Error('Failed to remove wishlist');
        }
      } catch (err) {
        console.error(err);
        // Revert UI if API fails
        setLiked(!newStatus);
        if (onToggle) onToggle(propertyId, !newStatus);
      }
    })();
  };

  return (
    <button
      onClick={handleHeartClick}
      ref={heartRef}
      className="rounded-full p-1 text-neutral-700 hover:bg-white/30 transition-transform active:scale-125"
      aria-label="save"
    >
      <Heart
        className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
          liked ? 'fill-red-500 stroke-white' : 'fill-[rgba(0,0,0,0.5)] stroke-white'
        }`}
      />
    </button>
  );
}

export default WhishBtn;
