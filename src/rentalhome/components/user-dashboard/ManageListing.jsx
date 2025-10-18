import React, { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "../../../AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import RentalNavbar from "../RentalNavBar";
import ListingCard from "./ListingCard";
import Nodata from "../../ui/Nodata";
import DashBoardTab from "../../ui/DashBoardTab";
import { getMyListingProperty } from "../../services/NewApi"; // your API wrapper

function ManageListing() {
  const { user } = useAuth();
  const menuItems = ["All", "Listed", "Unlisted"];

  const [manageList, setManageList] = useState(() => {
    const stored = localStorage.getItem("manageListmenu");
    return stored || menuItems[0];
  });

  const [listed, setListed] = useState([]);
  const [unlisted, setUnlisted] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (manageList) localStorage.setItem("manageListmenu", manageList);
  }, [manageList]);

  const handleMenuItem = (item) => setManageList(item);

  useEffect(() => {
    if (!user?.id) return;

    const fetchListings = async () => {
      setLoading(true);
      setError(null);

      try {
        let res;
        if (manageList === "All") {
          res = await getMyListingProperty({ id: user.id });
        } else {
          res = await getMyListingProperty({ id: user.id, status: manageList });
        }

        const data = res?.properties?.data || [];

        // Split listings by status
        if (manageList === "All") {
          setAllListings(data);
          setListed(data.filter((item) => item.status === "Listed"));
          setUnlisted(data.filter((item) => item.status === "Unlisted"));
        } else if (manageList === "Listed") {
          setListed(data);
        } else if (manageList === "Unlisted") {
          setUnlisted(data);
        }
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user, manageList]);

  const tripTypes = {
    All: allListings,
    Listed: listed,
    Unlisted: unlisted,
  };

  const currentList = tripTypes[manageList] || [];

  return (
    <>
      <RentalNavbar />
      <UserMenu />
      <section className="bg-gray-50">
        <div className="py-10 mx-auto w-xs sm:w-2xl md:w-3xl xl:w-7xl">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left tab menu */}
            <div className="md:w-1/4">
              <DashBoardTab
                menuItems={menuItems}
                menu={manageList}
                handleMenuItem={handleMenuItem}
              />
            </div>

            {/* Right listings area */}
            <div className="space-y-4 w-3/4">
              {loading && <p className="text-center text-gray-500">Loading listings…</p>}
              {error && <p className="text-center text-red-500">{error}</p>}

              {!loading && !error && (
                <AnimatePresence>
                  {manageList === "All"
                    ? menuItems
                        .filter((item) => item !== "All")
                        .map((item) => {
                          const list = tripTypes[item] || [];
                          return (
                            <motion.div
                              key={item}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              {list.length > 0 ? <ListingCard items={list} /> : <Nodata />}
                            </motion.div>
                          );
                        })
                    : (() => {
                        const list = tripTypes[manageList] || [];
                        return (
                          <motion.div
                            key={manageList}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            {list.length > 0 ? <ListingCard items={list} /> : <Nodata />}
                          </motion.div>
                        );
                      })()}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ManageListing;
