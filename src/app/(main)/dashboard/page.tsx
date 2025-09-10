"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LocationIcon from "@/components/icons/LocationIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import DashboardPost from "@/components/ui/DashboardPost/DashboardPost";
import Link from "next/link";
import axios from "axios";

export default function Dashboard() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.log("⛔ No token found!");
      return;
    }
    
    axios.get("https://jiran-api.com/api/v1/auth/show", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setUsername(response.data.data.name);
        setEmail(response.data.data.email);
        setAvatar(response.data.data.avatar_path);
      })
      .catch((error) => {
        console.error("❌ Error:", error);
      });
  }, []);

  return (
    <main className="container">
      {/* User info section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 my-11">
        <div className="flex flex-col justify-center">
          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <div className="relative w-28 h-28">
              <Image
                src={avatar || "/images/default-avatar.svg"}
                alt={username}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-xl font-semibold">{username}</h4>
              <span className="text-sm text-gray-900">{email}</span>
            </div>
          </div>

          {/* Bio and Quote */}
          <div>
            <h5 className="flex items-center font-medium gap-1 pt-2">
              <LocationIcon />
              New York, USA
            </h5>
            <p className="text-sm mt-1 text-gray-600 italic">
              &quot;You can&apos;t kill someone who has already died.&quot;
            </p>
          </div>
          {/* user's social media */}
          <div className="flex items-center gap-x-2 pt-1">
            <WhatsappIcon />
            <InstagramIcon />
            <LinkedinIcon />
          </div>
        </div>

        <div className="flex-row-center gap-2 ">
          <Link
            href="/dashboard-edit"
            className="flex-row-center w-36 h-9 rounded-[5px] hover:bg-[var(--primaryColor)] hover:border-[var(--PrimaryColor)] hover:text-white border text-[var(--navy)] border-gray-300"
          >
            Edit profile
          </Link>
          <Link
            href="/dashboard-edit"
            className="flex-row-center w-36 h-9 rounded-[5px] hover:bg-[var(--primaryColor)] hover:border-[var(--PrimaryColor)] hover:text-white border text-[var(--navy)] border-gray-300"
          >
            Share profile
          </Link>
        </div>
      </section>

      {/* posts */}
      <section className="space-y-4">
        <h3>Posts</h3>
        <div className=" flex justify-center  gap-8 w-full ">
          <div className="flex justify-between w-full max-w-[400px] *:max-w-[50px] *:w-full ">
            <svg>
              <use href="#AllOutlineIcon" />
            </svg>
            <svg>
              <use href="#BusinessOutlineIcon" />
            </svg>
            <svg>
              <use href="#JobOutlineIcon" />
            </svg>
            <svg>
              <use href="#NeedsOutlineIcon" />
            </svg>
            <svg>
              <use href="#CommunityOutlineIcon" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm pb-4">
          <DashboardPost />
        </div>
      </section>
    </main>
  );
}
