import { useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { FaPen } from "react-icons/fa";
import useAuth from "../../Hooks/UseAuth";
import axios from "../../Hooks/Axios";

const Profile = () => {
  const { user, setUser, updateUser } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [editing, setEditing] = useState(false);

  // console.log(user);

  const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    await updateUser({ displayName: name, photoURL });
    setUser({ ...user, displayName: name, photoURL });

    // Update MongoDB as well
    await axios.patch(
      `/users/${user.email}`,
      { name, photo: photoURL }
    );

    toast.success("Profile updated successfully!");
    setEditing(false);
  } catch (error) {
    console.error("Failed to update profile:", error);
    toast.error("Failed to update profile.");
  }
};

  return (
    <div className="min-h-[62vh] cabin transition-all duration-300 mt-16 lg:mt-[74px] bg-gradient-to-t from-white/60 via-[#38BDF8]/20 to-white/60 dark:bg-gradient-to-t dark:from-[#0F172A] dark:via-[#052f43] dark:to-[#0F172A]">
      <section className="max-w-xl min-h-[55vh] mx-auto mt-16 p-8 backdrop-blur-lg bg-white/30 dark:bg-[#1E293B]/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl transition-all duration-300 relative">
        <div className="flex flex-col items-center gap-4 relative">
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              refferrer Policy="no-referrer"
              className="w-28 h-28 rounded-full border-4 border-[#38BDF8] object-cover shadow-lg"
              data-tooltip-id="profile-img"
              data-tooltip-content="Your profile picture"
            />
            <Tooltip id="profile-img" />
            <button
              onClick={() => setEditing(true)}
              data-tooltip-id="edit-profile"
              data-tooltip-content="Edit Profile"
              className="absolute -bottom-2 -right-2 p-2 bg-[#38BDF8] hover:bg-[#0ea5e9] text-[#223A5E] rounded-full shadow transition-all duration-300"
            >
              <FaPen className="text-sm" />
            </button>
            <Tooltip id="edit-profile" />
          </motion.div>

          <motion.h2
            className="text-2xl font-bold text-[#223A5E] dark:text-[#38BDF8]"
            data-tooltip-id="display-name"
            data-tooltip-content="Your display name"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {user?.displayName}
          </motion.h2>
          <Tooltip id="display-name" />

          <motion.p
            className="text-sm text-[#0ea5e9] dark:text-[#D0E7F9]"
            data-tooltip-id="email-id"
            data-tooltip-content="Your email address"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {user?.email}
          </motion.p>
          <Tooltip id="email-id" />
        </div>

        <AnimatePresence>
          {editing && (
            <motion.form
              onSubmit={handleUpdate}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="mt-6 flex flex-col gap-4"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new name"
                className="border border-[#38BDF8] text-[#223A5E] dark:text-[#D0E7F9] dark:bg-[#1E293B] placeholder-[#0ea5e9] px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                data-tooltip-id="edit-name"
                data-tooltip-content="Update your display name"
              />
              <Tooltip id="edit-name" />

              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Enter new photo URL"
                className="border border-[#38BDF8] text-[#223A5E] dark:text-[#D0E7F9] dark:bg-[#1E293B] placeholder-[#0ea5e9] px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                data-tooltip-id="edit-photo"
                data-tooltip-content="Update your profile picture URL"
              />
              <Tooltip id="edit-photo" />

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="bg-[#38BDF8] text-[#223A5E] font-semibold py-2 px-5 rounded-xl hover:bg-[#0ea5e9] hover:text-white transition-all duration-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="border border-[#38BDF8] text-[#223A5E] dark:text-[#D0E7F9] py-2 px-5 rounded-xl hover:bg-[#D0E7F9] dark:hover:bg-[#23395d] transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Profile;
