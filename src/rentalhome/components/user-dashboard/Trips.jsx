import React, { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "../../../AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import RentalNavbar from "../RentalNavBar";
import ListingCard from "../../ui/ListingCard";
import Nodata from "../../ui/Nodata";
import DashBoardTab from "../../ui/DashBoardTab";
import { fetchTripsByMenu } from "../../services/NewApi"; // ✅ API call

function Trips() {
  const { user } = useAuth();
  const userId = user?.id || 2; // fallback for demo
  const menuItems = ["All", "Current", "Upcoming", "Pending", "Completed", "Expired"];

  const [tripMenu, setTripMenu] = useState("All");
  const [tripData, setTripData] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Load API data dynamically
  const loadTrips = async (menu) => {
    try {
      setLoading(true);
      const data = await fetchTripsByMenu(menu, userId);
      setTripData((prev) => ({ ...prev, [menu]: data }));
    } catch (error) {
      console.error("Failed to load trips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrips(tripMenu);
  }, [tripMenu]);

  const handleMenuItem = (item) => {
    setTripMenu(item);
  };

  return (
    <>
      <RentalNavbar />
      <UserMenu />
      <section className="bg-gray-50 min-h-screen">
        <div className="py-10 mx-auto w-xs sm:w-2xl md:w-3xl xl:w-7xl">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <DashBoardTab menuItems={menuItems} menu={tripMenu} handleMenuItem={handleMenuItem} />
            </div>

            {/* Main content */}
            <div className="space-y-4 w-full md:w-3/4">
              <AnimatePresence>
                <motion.div
                  key={tripMenu}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading...</div>
                  ) : !tripData[tripMenu] || tripData[tripMenu].length === 0 ? (
                    <Nodata />
                  ) : (
                    <ListingCard items={tripData[tripMenu]} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Trips;
