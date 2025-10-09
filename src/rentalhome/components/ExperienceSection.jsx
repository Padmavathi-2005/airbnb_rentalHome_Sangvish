import React from 'react';

const activities = [
  {
    title: 'Cycling',
    events: 38,
    image: 'https://images.unsplash.com/photo-1681295692638-97ace05f56b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: 'orange',
  },
  {
    title: 'Climbing',
    events: 21,
    image: 'https://images.unsplash.com/photo-1460401198597-974910381f6e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: 'green',
  },
  {
    title: 'Flyboarding',
    events: 7,
    image: 'https://images.unsplash.com/photo-1592946879272-bc79c290b1e5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: 'yellow',
  },
  {
    title: 'Slack AI',
    events: 96,
    image: 'https://images.unsplash.com/photo-1600965962102-9d260a71890d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: 'violet',
  },
];

const gradientColors = {
  violet: 'linear-gradient(to right, #7F00FF, #B266FF)',
  green: 'linear-gradient(to right, #00c17dff, #009d66ff)',
  yellow: 'linear-gradient(to right, #ffd900ff, #cbad00ff)',
  orange: 'linear-gradient(to right, #FFA500, #FFCC66)',
};

const ExperienceSection = () => {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:py-12 lg:py-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch h-[1000px] sm:h-[500px]">
          {/* Left: Main Card */}
          <div
            className="md:col-span-2 h-500px relative bg-blue-100 rounded-2xl p-8 flex flex-col justify-center overflow-hidden bg-cover shadow-xl bg-center"
            style={{
              background:
                "url('https://images.unsplash.com/photo-1507691640734-887fa7be3377?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          >
            <div className="relative z-10">
              <p className="text-lg mb-1 text-white font-semibold">
                over 1000 events
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Find and book
                <br /> activities near you.
              </h1>
              <button className="bg-transparent px-10 py-2 rounded-full text-white border border-white hover:bg-white hover:text-black transition mt-4">
                View
              </button>
            </div>
          </div>

          {/* Right: Activities Grid */}
          <div className="grid grid-cols-2 gap-4">
            {activities.map((act) => (
              <div
                key={act.title}
                className={`relative rounded-xl shadow-md overflow-hidden flex flex-col justify-end min-h-[140px]`}
                style={{ backgroundColor: 'transparent' }}
              >
                <img
                  src={act.image}
                  alt={act.title}
                  className="absolute inset-0 object-cover w-full h-full opacity-70 pointer-events-none"
                />

                {/* Slanted section using skew with dynamic gradient */}
                <div
                  className="relative left-0 right-0 bottom-2 top-25 h-30 transform skew-y-[-10deg]"
                  style={{ background: gradientColors[act.color] }}
                />

                <div className="relative z-10 px-4 pb-4">
                  <div className="relative z-10 transform pb-2">
                    <h2 className="text-white font-bold text-lg">{act.title}</h2>
                    <p className="text-white text-sm">{act.events} events</p>
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
