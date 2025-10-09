import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Heart } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { addToWishlist, removeFromWishlist } from '../../Api';

function WhishBtn({ propertyId, initialStatus, onToggle }) {
  const { user: authUser } = useAuth();
  const [liked, setLiked] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleHeartClick = async (e) => {
    e.preventDefault();
    if (!authUser) return navigate('/login');

    if (loading) return;
    setLoading(true);

    // Optimistic update
    const newStatus = !liked;
    setLiked(newStatus);
    if (onToggle) onToggle(propertyId, newStatus);

    try {
      if (newStatus) {
        const res = await addToWishlist(propertyId, String(authUser.id));
        if (!res.status) {
          setLiked(!newStatus); // revert
          if (onToggle) onToggle(propertyId, !newStatus);
        }
      } else {
        const res = await removeFromWishlist(propertyId, String(authUser.id));
        if (!res.status) {
          setLiked(!newStatus); // revert
          if (onToggle) onToggle(propertyId, !newStatus);
        }
      }
    } catch (err) {
      console.error(err);
      setLiked(!newStatus); // revert
      if (onToggle) onToggle(propertyId, !newStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleHeartClick}
      className="rounded-full p-1 text-neutral-700 hover:bg-white/30"
      aria-label="save"
    >
      <Heart
        className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${
          liked ? 'fill-red-500 stroke-white' : 'fill-[rgba(0,0,0,0.5)] stroke-white'
        }`}
      />
    </button>
  );
}

export default WhishBtn;
