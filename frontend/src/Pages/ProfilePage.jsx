import { useState } from "react";
import { useUserAuthStore } from "../store/userAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useUserAuthStore();
  const [editName, setEditName] = useState(false);
  const [fullName, setFullName] = useState(authUser?.fullname || "");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleNameUpdate = async () => {
    if (fullName.trim() && fullName !== authUser.fullname) {
      await updateProfile({ fullname: fullName });
      setEditName(false);
    }
  };

  return (
    <div className="h-screen pt-20 bg-[#181e29]">
      <div className="max-w-xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-8 space-y-10 shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="mt-2 text-base-content/70">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-36 rounded-full object-cover border-4 border-primary shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              {editName ? (
                <div className="flex gap-2">
                  <input
                    className="input input-bordered w-full"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isUpdatingProfile}
                  />
                  <button className="btn btn-primary" onClick={handleNameUpdate} disabled={isUpdatingProfile}>
                    Save
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      setEditName(false);
                      setFullName(authUser.fullname);
                    }}
                    disabled={isUpdatingProfile}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border w-full">{authUser?.fullname}</p>
                  <button className="btn btn-sm" onClick={() => setEditName(true)} disabled={isUpdatingProfile}>
                    Edit
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <input
                className="input input-bordered w-full bg-base-200 rounded-lg border"
                value={authUser?.email}
                disabled
              />
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6 border border-base-200">
            <h2 className="text-lg font-medium mb-4 text-white">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span className="text-base-content/70">Member Since</span>
                <span className="text-base-content/90">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-base-content/70">Account Status</span>
                <span className="text-green-500 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;