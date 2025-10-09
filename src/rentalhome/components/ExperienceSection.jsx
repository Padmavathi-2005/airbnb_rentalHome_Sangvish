import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpProperties } from '../services/NewApi';
import { setExpPropertyList } from '../../slices/ExpPropertySlice'; // adjust if you store exp in another slice

const gradientColors = {
  violet: 'linear-gradient(to right, #7F00FF, #B266FF)',
  green: 'linear-gradient(to right, #00c17dff, #009d66ff)',
  yellow: 'linear-gradient(to right, #ffd900ff, #cbad00ff)',
  orange: 'linear-gradient(to right, #FFA500, #FFCC66)',
};

const ExperienceSection = () => {
  const dispatch = useDispatch();
  const expProperties = useSelector((state) => state.expPropertyList); // redux store
  const [loading, setLoading] = useState(true);

  const payload = { location: '', date: '2025-10-09', item: 16 }; // example payload

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExpProperties(payload);
        if (data && data.length > 0) {
          dispatch(setExpPropertyList(data));
        }
      } catch (err) {
        console.error('Error fetching experience properties', err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch only if not already in Redux
    if (!expProperties || expProperties.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [dispatch, expProperties]);

  if (loading) return null; // or a loading skeleton

  if (!expProperties || expProperties.length === 0) return null; // no data

  const displayProperties = expProperties.slice(0, 5); // only 5 items

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:py-12 lg:py-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch h-[1000px] sm:h-[500px]">

          {/* Left: Main Card */}
          <div
            className="md:col-span-2 h-500px relative rounded-2xl p-8 flex flex-col justify-center overflow-hidden bg-cover shadow-xl bg-center"
            style={{ backgroundImage: `url(${displayProperties[0].cover_photo})` }}
          >
            <div className="relative z-10">
              <p className="text-lg mb-1 text-white font-semibold">
                over {displayProperties[0].events || 1000} events
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Find and book<br /> activities near you.
              </h1>
              <button className="bg-transparent px-10 py-2 rounded-full text-white border border-white hover:bg-white hover:text-black transition mt-4">
                View
              </button>
            </div>
          </div>

          {/* Right: Activities Grid */}
          <div className="grid grid-cols-2 gap-4">
            {displayProperties.slice(1).map((act, index) => (
              <div
                key={act.id || index}
                className="relative rounded-xl shadow-md overflow-hidden flex flex-col justify-end min-h-[140px]"
              >
                <img
                  src={act.cover_photo}
                  alt={act.title || 'Activity'}
                  className="absolute inset-0 object-cover w-full h-full opacity-70 pointer-events-none"
                />

                <div
                  className="relative left-0 right-0 bottom-2 top-25 h-30 transform skew-y-[-10deg]"
                  style={{
                    background: gradientColors[
                      ['orange', 'green', 'yellow', 'violet'][index % 4]
                    ],
                  }}
                />

                <div className="relative z-10 px-4 pb-4">
                  <div className="relative z-10 transform pb-2">
                    <h2 className="text-white font-bold text-lg">{act.title}</h2>
                    <p className="text-white text-sm">
                      {act.events || Math.floor(Math.random() * 100)} events
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
